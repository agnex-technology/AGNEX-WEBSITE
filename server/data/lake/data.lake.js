/**
 * Phase 133 — Enterprise Data Lake
 * Multi-layer Data Lake with Raw → Processed → Curated architecture.
 * 
 * In production: GCS / S3 backend with Parquet files.
 * This implementation provides the interface, lifecycle management,
 * metadata indexing, and retention enforcement.
 */

const path = require('path');

const LAYERS = {
  RAW:       'raw',       // Unmodified source data — immutable, append-only
  PROCESSED: 'processed', // Cleaned, validated, typed
  CURATED:   'curated',   // Aggregated, business-ready datasets
};

// Retention policies per layer (days)
const RETENTION = {
  [LAYERS.RAW]:       365,
  [LAYERS.PROCESSED]: 180,
  [LAYERS.CURATED]:   730,
};

class DataLake {
  constructor() {
    // In-memory metadata index (production: lake.objects table in PostgreSQL)
    this._objects = [];
    this._totalBytes = 0;
    this._stats = { raw: 0, processed: 0, curated: 0 };
  }

  /**
   * Ingest data into the Raw layer
   * @param {object} params
   * @param {string} params.source      - Source system identifier
   * @param {string} params.contentType - e.g. 'application/json', 'text/csv'
   * @param {Buffer|string} params.data - The raw data content
   * @param {object} params.tags        - Custom metadata tags
   * @returns {object} Lake object metadata
   */
  async ingestRaw({ source, contentType = 'application/json', data, tags = {} }) {
    const partition = this._partition(new Date());
    const objectKey = `${LAYERS.RAW}/${source}/${partition}/${Date.now()}_${Math.random().toString(36).slice(2, 8)}.json`;
    const sizeBytes = Buffer.byteLength(typeof data === 'string' ? data : JSON.stringify(data));
    const retentionUntil = new Date(Date.now() + RETENTION[LAYERS.RAW] * 86400000);

    const object = {
      id: `lk_${Date.now()}`,
      layer: LAYERS.RAW,
      bucket: 'agnex-data-lake',
      objectKey,
      contentType,
      sizeBytes,
      source,
      tags: { ...tags, ingested_at: new Date().toISOString() },
      retentionUntil: retentionUntil.toISOString(),
      compressed: false,
      encrypted: true,
      createdAt: new Date().toISOString(),
      // In production: data is written to GCS/S3 here
      _data: data,
    };

    this._objects.push(object);
    this._totalBytes += sizeBytes;
    this._stats[LAYERS.RAW]++;

    console.log(JSON.stringify({ level: 'info', message: '[DataLake] Raw ingestion', objectKey, sizeBytes, source }));
    return { id: object.id, objectKey, sizeBytes, layer: LAYERS.RAW };
  }

  /**
   * Promote data to Processed layer (after ETL cleaning)
   * @param {string} rawObjectId
   * @param {object|string} processedData - Cleaned / transformed data
   * @param {object} transformationLog
   */
  async promoteToProcessed(rawObjectId, processedData, transformationLog = {}) {
    const rawObj = this._objects.find(o => o.id === rawObjectId && o.layer === LAYERS.RAW);
    if (!rawObj) throw new Error(`DataLake: Raw object "${rawObjectId}" not found`);

    const partition = this._partition(new Date(rawObj.createdAt));
    const objectKey = `${LAYERS.PROCESSED}/${rawObj.source}/${partition}/${rawObjectId}_processed.parquet`;
    const sizeBytes = Buffer.byteLength(JSON.stringify(processedData));

    const object = {
      id: `lk_p_${Date.now()}`,
      layer: LAYERS.PROCESSED,
      bucket: 'agnex-data-lake',
      objectKey,
      contentType: 'application/parquet',
      sizeBytes,
      source: rawObj.source,
      tags: { raw_object_id: rawObjectId, ...transformationLog },
      retentionUntil: new Date(Date.now() + RETENTION[LAYERS.PROCESSED] * 86400000).toISOString(),
      compressed: true,
      encrypted: true,
      createdAt: new Date().toISOString(),
      _data: processedData,
    };

    this._objects.push(object);
    this._stats[LAYERS.PROCESSED]++;
    return { id: object.id, objectKey, layer: LAYERS.PROCESSED };
  }

  /**
   * Promote to Curated layer (business-ready aggregates)
   */
  async promoteToCurated(datasetName, data, metadata = {}) {
    const objectKey = `${LAYERS.CURATED}/${datasetName}/${this._partition(new Date())}/dataset.parquet`;
    const sizeBytes = Buffer.byteLength(JSON.stringify(data));

    const object = {
      id: `lk_c_${Date.now()}`,
      layer: LAYERS.CURATED,
      bucket: 'agnex-data-lake',
      objectKey,
      contentType: 'application/parquet',
      sizeBytes,
      source: datasetName,
      tags: { ...metadata, curated_at: new Date().toISOString() },
      retentionUntil: new Date(Date.now() + RETENTION[LAYERS.CURATED] * 86400000).toISOString(),
      compressed: true,
      encrypted: true,
      createdAt: new Date().toISOString(),
      _data: data,
    };

    this._objects.push(object);
    this._stats[LAYERS.CURATED]++;
    return { id: object.id, objectKey, layer: LAYERS.CURATED };
  }

  /**
   * Enforce retention — delete/archive objects past their retention date
   */
  async enforceRetention() {
    const now = new Date();
    const expired = this._objects.filter(o => new Date(o.retentionUntil) < now);
    expired.forEach(o => {
      // Production: delete from GCS/S3 or move to archive bucket (Coldline/Glacier)
      this._objects = this._objects.filter(obj => obj.id !== o.id);
      console.log(JSON.stringify({ level: 'info', message: '[DataLake] Object expired — archived', objectKey: o.objectKey, layer: o.layer }));
    });
    return { expired: expired.length, remaining: this._objects.length };
  }

  /** Query metadata index */
  query({ layer, source, limit = 50 }) {
    let results = [...this._objects];
    if (layer)  results = results.filter(o => o.layer === layer);
    if (source) results = results.filter(o => o.source === source);
    return results.slice(-limit).map(({ _data, ...meta }) => meta); // Strip raw data from listing
  }

  getStats() {
    return {
      totalObjects: this._objects.length,
      totalBytes:   this._totalBytes,
      byLayer:      { ...this._stats },
      retentionDays: RETENTION,
    };
  }

  // Hive-style partitioning: year=YYYY/month=MM/day=DD
  _partition(date) {
    const d = new Date(date);
    return `year=${d.getFullYear()}/month=${String(d.getMonth() + 1).padStart(2, '0')}/day=${String(d.getDate()).padStart(2, '0')}`;
  }
}

module.exports = { dataLake: new DataLake(), LAYERS, RETENTION };
