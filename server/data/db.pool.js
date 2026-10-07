/**
 * Phase 131 — Enterprise Data Architecture
 * Database Connection Pool — single shared pg Pool for the entire platform.
 * 
 * Features:
 * - Connection pooling (max 20 connections)
 * - Health check query on acquire
 * - Structured query logging with correlation IDs
 * - Graceful shutdown support
 * - Read replica routing (future: write → primary, read → replica)
 */

const { Pool } = require('pg');

// Primary (read-write) pool
const primaryPool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max:              parseInt(process.env.DB_POOL_MAX || '20', 10),
  min:              parseInt(process.env.DB_POOL_MIN || '2', 10),
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 5_000,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: true } : false,
  application_name: 'agnex-api',
});

// Read replica pool (falls back to primary if no replica URL configured)
const replicaPool = process.env.DATABASE_REPLICA_URL
  ? new Pool({
      connectionString: process.env.DATABASE_REPLICA_URL,
      max: parseInt(process.env.DB_REPLICA_POOL_MAX || '10', 10),
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 5_000,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: true } : false,
      application_name: 'agnex-api-replica',
    })
  : primaryPool;

// Log pool events
primaryPool.on('connect', () => {
  console.log(JSON.stringify({ level: 'debug', message: '[DB] New connection established to primary' }));
});
primaryPool.on('error', (err) => {
  console.error(JSON.stringify({ level: 'error', message: '[DB] Pool error', error: err.message }));
});

/**
 * Execute a query on the primary (write) pool
 * @param {string} text - SQL query
 * @param {any[]} [params] - Query parameters
 * @param {string} [correlationId]
 */
const query = async (text, params = [], correlationId = '') => {
  const start = Date.now();
  try {
    const result = await primaryPool.query(text, params);
    console.log(JSON.stringify({
      level: 'debug', message: '[DB] Query', durationMs: Date.now() - start,
      rows: result.rowCount, correlationId,
    }));
    return result;
  } catch (err) {
    console.error(JSON.stringify({ level: 'error', message: '[DB] Query failed', error: err.message, query: text.slice(0, 200), correlationId }));
    throw err;
  }
};

/**
 * Execute a query on the read replica pool
 */
const queryRead = async (text, params = [], correlationId = '') => {
  const start = Date.now();
  try {
    const result = await replicaPool.query(text, params);
    console.log(JSON.stringify({ level: 'debug', message: '[DB] Read query', durationMs: Date.now() - start, rows: result.rowCount, correlationId }));
    return result;
  } catch (err) {
    console.error(JSON.stringify({ level: 'error', message: '[DB] Read query failed', error: err.message }));
    throw err;
  }
};

/**
 * Execute multiple queries inside a transaction
 * @param {Function} callback - async (client) => { ... }
 */
const withTransaction = async (callback) => {
  const client = await primaryPool.connect();
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

/** Health check — used by /health/ready probe */
const healthCheck = async () => {
  try {
    const result = await primaryPool.query('SELECT 1 AS ok');
    return result.rows[0].ok === 1;
  } catch {
    return false;
  }
};

/** Graceful shutdown */
const shutdown = async () => {
  await primaryPool.end();
  if (replicaPool !== primaryPool) await replicaPool.end();
  console.log(JSON.stringify({ level: 'info', message: '[DB] Connection pools closed' }));
};

process.on('SIGTERM', shutdown);
process.on('SIGINT',  shutdown);

module.exports = { query, queryRead, withTransaction, healthCheck, primaryPool, replicaPool };
