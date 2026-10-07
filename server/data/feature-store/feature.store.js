/**
 * Phase 137 — Enterprise AI Feature Store
 * Feature Store — online (low-latency) + offline (batch) feature management.
 * 
 * Online store:  Redis/in-memory for real-time inference
 * Offline store: PostgreSQL ai.features table for training data
 * 
 * Features are versioned, validated, and have data lineage tracking.
 */

const { query, queryRead } = require('../db.pool');

// ─── Feature Registry — single source of truth for all feature definitions ────

const FEATURE_REGISTRY = {
  // User features
  'user.login_frequency_7d': {
    group: 'user_engagement',
    entityType: 'user',
    description: 'Number of logins in the last 7 days',
    dtype: 'integer',
    validRange: [0, 10000],
    ttlSeconds: 3600,
    tags: ['engagement', 'behavioral'],
  },
  'user.application_count': {
    group: 'user_recruitment',
    entityType: 'user',
    description: 'Total job applications submitted by user',
    dtype: 'integer',
    validRange: [0, 10000],
    ttlSeconds: 86400,
    tags: ['recruitment'],
  },

  // Job features
  'job.application_rate_7d': {
    group: 'job_performance',
    entityType: 'job',
    description: 'Applications per day over last 7 days',
    dtype: 'float',
    validRange: [0, 10000],
    ttlSeconds: 3600,
    tags: ['recruitment', 'performance'],
  },
  'job.hire_rate_lifetime': {
    group: 'job_performance',
    entityType: 'job',
    description: 'Historical hire rate for this job type',
    dtype: 'float',
    validRange: [0, 1],
    ttlSeconds: 86400,
    tags: ['recruitment', 'ml_training'],
  },

  // Lead features
  'lead.crm_score': {
    group: 'crm',
    entityType: 'lead',
    description: 'AI-computed lead quality score (0-100)',
    dtype: 'float',
    validRange: [0, 100],
    ttlSeconds: 86400,
    tags: ['crm', 'ai', 'scoring'],
  },
  'lead.days_in_pipeline': {
    group: 'crm',
    entityType: 'lead',
    description: 'Days since lead was created',
    dtype: 'integer',
    validRange: [0, 3650],
    ttlSeconds: 3600,
    tags: ['crm', 'pipeline'],
  },

  // AI features
  'ai.session_context_length': {
    group: 'ai_usage',
    entityType: 'session',
    description: 'Token count of current conversation context',
    dtype: 'integer',
    validRange: [0, 1000000],
    ttlSeconds: 1800,
    tags: ['ai', 'cost_optimization'],
  },
};

class FeatureStore {
  constructor() {
    // Online store: in-memory cache (production: Redis)
    this._onlineStore = new Map(); // key: `${feature}:${entityId}` → { value, expiresAt }

    // Offline store: backed by ai.features table
    // In-memory buffer for dev (production: written to PostgreSQL)
    this._offlineBuffer = [];
  }

  /**
   * Write a feature value to both online and offline stores
   * @param {object} params
   * @param {string} params.featureName
   * @param {string} params.entityId
   * @param {*} params.value
   * @param {object} [params.metadata]
   */
  async set({ featureName, entityId, value, metadata = {} }) {
    const def = FEATURE_REGISTRY[featureName];
    if (!def) throw new Error(`FeatureStore: Unknown feature "${featureName}"`);

    // Validation
    this._validate(featureName, value, def);

    // Write to online store
    const cacheKey = `${featureName}:${entityId}`;
    this._onlineStore.set(cacheKey, {
      value,
      expiresAt: Date.now() + (def.ttlSeconds * 1000),
      writtenAt: Date.now(),
    });

    // Write to offline store (PostgreSQL)
    const offlineEntry = {
      feature_name: featureName,
      feature_group: def.group,
      entity_type: def.entityType,
      entity_id: entityId,
      value: JSON.stringify({ value }),
      version: 1,
      valid_from: new Date().toISOString(),
      metadata: JSON.stringify({ ...metadata, source: 'feature_store' }),
    };
    this._offlineBuffer.push(offlineEntry);

    // Flush buffer to DB periodically (in prod: use BullMQ job)
    if (this._offlineBuffer.length >= 10) await this._flushOffline();
  }

  /**
   * Read a feature value (online store first, then offline)
   * @param {string} featureName
   * @param {string} entityId
   */
  async get(featureName, entityId) {
    const def = FEATURE_REGISTRY[featureName];
    if (!def) throw new Error(`FeatureStore: Unknown feature "${featureName}"`);

    // Online store lookup
    const cacheKey = `${featureName}:${entityId}`;
    const cached = this._onlineStore.get(cacheKey);
    if (cached && Date.now() < cached.expiresAt) {
      return { value: cached.value, source: 'online', feature: featureName, entityId };
    }

    // Offline store lookup
    try {
      const result = await queryRead(`
        SELECT value FROM ai.features
        WHERE feature_name = $1 AND entity_id = $2
        ORDER BY valid_from DESC LIMIT 1
      `, [featureName, entityId]);
      if (result.rows.length > 0) {
        const value = JSON.parse(result.rows[0].value).value;
        // Populate online cache
        this._onlineStore.set(cacheKey, { value, expiresAt: Date.now() + (def.ttlSeconds * 1000), writtenAt: Date.now() });
        return { value, source: 'offline', feature: featureName, entityId };
      }
    } catch { /* DB unavailable — return null */ }

    return { value: null, source: 'miss', feature: featureName, entityId };
  }

  /**
   * Batch read multiple features for an entity (feature vector for ML)
   * @param {string} entityId
   * @param {string[]} featureNames
   */
  async getVector(entityId, featureNames) {
    const vector = {};
    await Promise.all(featureNames.map(async (name) => {
      const result = await this.get(name, entityId);
      vector[name] = result.value;
    }));
    return vector;
  }

  _validate(featureName, value, def) {
    if (value === null || value === undefined) return; // Allow nulls (missing data)
    if (def.validRange) {
      const [min, max] = def.validRange;
      if (value < min || value > max) {
        throw new Error(`FeatureStore: Value ${value} out of range [${min}, ${max}] for feature "${featureName}"`);
      }
    }
  }

  async _flushOffline() {
    const batch = this._offlineBuffer.splice(0, 10);
    for (const entry of batch) {
      try {
        await query(`
          INSERT INTO ai.features (feature_name, feature_group, entity_type, entity_id, value, metadata)
          VALUES ($1, $2, $3, $4, $5::jsonb, $6::jsonb)
          ON CONFLICT (feature_name, entity_type, entity_id, version) DO UPDATE
          SET value = EXCLUDED.value, valid_from = NOW()
        `, [entry.feature_name, entry.feature_group, entry.entity_type, entry.entity_id, entry.value, entry.metadata]);
      } catch { /* log and continue */ }
    }
  }

  getRegistry() {
    return Object.entries(FEATURE_REGISTRY).map(([name, def]) => ({ name, ...def }));
  }

  getStats() {
    const active = Array.from(this._onlineStore.entries()).filter(([_, v]) => Date.now() < v.expiresAt).length;
    return {
      registeredFeatures: Object.keys(FEATURE_REGISTRY).length,
      onlineCacheSize:    this._onlineStore.size,
      activeCacheEntries: active,
      offlineBuffer:      this._offlineBuffer.length,
    };
  }
}

module.exports = { featureStore: new FeatureStore(), FEATURE_REGISTRY };
