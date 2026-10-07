/**
 * AGNEX Database Migration Runner
 * Applies schema migrations sequentially from server/database/migrations/
 */
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { primaryPool, withTransaction } = require('../data/db.pool');

async function runMigrations() {
    console.log(JSON.stringify({
        level: 'info',
        message: '[MigrationRunner] Starting schema migration check...',
        timestamp: new Date().toISOString()
    }));

    if (!process.env.DATABASE_URL) {
        console.warn(JSON.stringify({
            level: 'warn',
            message: '[MigrationRunner] DATABASE_URL not configured. Skipping migrations.'
        }));
        process.exit(0);
    }

    try {
        // Ensure migration tracking table exists
        await primaryPool.query(`
            CREATE TABLE IF NOT EXISTS schema_migrations (
                id VARCHAR(255) PRIMARY KEY,
                applied_at TIMESTAMPTZ DEFAULT NOW()
            );
        `);

        // Fetch already applied migrations
        const appliedResult = await primaryPool.query('SELECT id FROM schema_migrations');
        const appliedSet = new Set(appliedResult.rows.map((row) => row.id));

        // Read migration files in alphabetical order
        const migrationsDir = path.join(__dirname, 'migrations');
        const files = fs.readdirSync(migrationsDir)
            .filter((f) => f.endsWith('.sql'))
            .sort();

        let appliedCount = 0;

        for (const file of files) {
            if (appliedSet.has(file)) {
                continue;
            }

            console.log(JSON.stringify({
                level: 'info',
                message: `[MigrationRunner] Applying migration: ${file}`
            }));

            const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf-8');

            await withTransaction(async (client) => {
                await client.query(sql);
                await client.query('INSERT INTO schema_migrations (id) VALUES ($1)', [file]);
            });

            console.log(JSON.stringify({
                level: 'info',
                message: `[MigrationRunner] Successfully applied: ${file}`
            }));
            appliedCount++;
        }

        console.log(JSON.stringify({
            level: 'info',
            message: `[MigrationRunner] Migration complete. Applied ${appliedCount} new file(s).`,
            totalMigrations: files.length,
            timestamp: new Date().toISOString()
        }));

        process.exit(0);
    } catch (err) {
        console.error(JSON.stringify({
            level: 'error',
            message: '[MigrationRunner] Migration execution failed',
            error: err.message,
            stack: err.stack
        }));
        process.exit(1);
    }
}

if (require.main === module) {
    runMigrations();
}

module.exports = { runMigrations };
