/**
 * Phase 136 — Enterprise ETL/ELT Platform
 * Pipeline Registry & Runner — scheduled, retry-aware, monitored data pipelines.
 * 
 * Each pipeline is: Extract → Transform → Load
 * Pipelines are registered by name and can be triggered manually or scheduled.
 */

const { dataLake } = require('../lake/data.lake');
const { query, queryRead } = require('../db.pool');

// ─── Built-in Pipelines ───────────────────────────────────────────────────────

const PIPELINES = {
  /**
   * ETL: Extract audit_logs → transform → load into data lake (raw layer)
   */
  'audit_logs_to_lake': {
    description: 'Export audit logs to data lake (raw layer)',
    schedule: '0 * * * *', // Every hour
    extract: async () => {
      try {
        const result = await queryRead(`SELECT * FROM audit_logs WHERE created_at > NOW() - INTERVAL '1 hour' ORDER BY created_at`);
        return result.rows;
      } catch { return []; }
    },
    transform: (rows) => rows.map(r => ({ ...r, _pipeline: 'audit_logs_to_lake', _extracted_at: new Date().toISOString() })),
    load: async (data) => {
      if (data.length === 0) return { loaded: 0 };
      await dataLake.ingestRaw({ source: 'audit_logs', contentType: 'application/json', data, tags: { pipeline: 'audit_logs_to_lake' } });
      return { loaded: data.length };
    },
  },

  /**
   * ETL: Recruitment funnel → analytics.recruitment_funnel_daily
   */
  'recruitment_funnel_daily': {
    description: 'Aggregate recruitment funnel metrics into analytics schema',
    schedule: '0 1 * * *', // Every day at 1 AM
    extract: async () => {
      try {
        const result = await queryRead(`
          SELECT job_id, status, COUNT(*) as count
          FROM applications
          WHERE applied_at::date = CURRENT_DATE - 1
          GROUP BY job_id, status
        `);
        return result.rows;
      } catch { return []; }
    },
    transform: (rows) => {
      const byJob = {};
      rows.forEach(r => {
        if (!byJob[r.job_id]) byJob[r.job_id] = { job_id: r.job_id, applications: 0, reviews: 0, interviews: 0, offers: 0, hires: 0 };
        const map = { SUBMITTED: 'applications', REVIEWING: 'reviews', INTERVIEW: 'interviews', OFFERED: 'offers', HIRED: 'hires' };
        if (map[r.status]) byJob[r.job_id][map[r.status]] = parseInt(r.count);
      });
      return Object.values(byJob);
    },
    load: async (data) => {
      let loaded = 0;
      for (const row of data) {
        try {
          await query(`
            INSERT INTO analytics.recruitment_funnel_daily (date, job_id, applications, reviews, interviews, offers, hires)
            VALUES (CURRENT_DATE - 1, $1, $2, $3, $4, $5, $6)
            ON CONFLICT (date, job_id) DO UPDATE SET
              applications = EXCLUDED.applications, reviews = EXCLUDED.reviews,
              interviews = EXCLUDED.interviews, offers = EXCLUDED.offers, hires = EXCLUDED.hires
          `, [row.job_id, row.applications, row.reviews, row.interviews, row.offers, row.hires]);
          loaded++;
        } catch { /* skip individual row failures */ }
      }
      return { loaded };
    },
  },
};

// ─── Pipeline Runner ──────────────────────────────────────────────────────────

class PipelineRunner {
  constructor() {
    this._executionLog = [];
    this.MAX_LOG = 500;
  }

  /**
   * Execute a pipeline by name
   * @param {string} pipelineName
   * @param {object} options - { retries: 3 }
   */
  async run(pipelineName, options = {}) {
    const pipeline = PIPELINES[pipelineName];
    if (!pipeline) throw new Error(`PipelineRunner: Unknown pipeline "${pipelineName}"`);

    const runId = `run_${Date.now()}`;
    const startTime = Date.now();
    const retries = options.retries ?? 3;

    console.log(JSON.stringify({ level: 'info', message: `[ETL] Pipeline started`, pipelineName, runId }));

    let lastError, extractedCount = 0, loadedCount = 0;

    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        // Extract
        const rawData = await pipeline.extract();
        extractedCount = Array.isArray(rawData) ? rawData.length : 1;

        // Transform
        const transformed = pipeline.transform(rawData);

        // Load
        const loadResult = await pipeline.load(transformed);
        loadedCount = loadResult.loaded || 0;

        const entry = {
          runId, pipelineName, status: 'success', attempt,
          extractedCount, loadedCount,
          durationMs: Date.now() - startTime,
          completedAt: new Date().toISOString(),
        };
        this._log(entry);
        console.log(JSON.stringify({ level: 'info', message: '[ETL] Pipeline completed', ...entry }));
        return entry;

      } catch (err) {
        lastError = err;
        console.error(JSON.stringify({ level: 'warn', message: `[ETL] Pipeline attempt ${attempt} failed`, pipelineName, error: err.message }));
        if (attempt < retries) await new Promise(r => setTimeout(r, Math.pow(2, attempt) * 500));
      }
    }

    const failEntry = {
      runId, pipelineName, status: 'failed',
      error: lastError?.message,
      durationMs: Date.now() - startTime,
      completedAt: new Date().toISOString(),
    };
    this._log(failEntry);
    throw new Error(`PipelineRunner: Pipeline "${pipelineName}" failed after ${retries} attempts: ${lastError?.message}`);
  }

  /** Run all registered pipelines */
  async runAll() {
    const results = [];
    for (const name of Object.keys(PIPELINES)) {
      try {
        results.push(await this.run(name));
      } catch (err) {
        results.push({ pipelineName: name, status: 'failed', error: err.message });
      }
    }
    return results;
  }

  _log(entry) {
    this._executionLog.push(entry);
    if (this._executionLog.length > this.MAX_LOG) this._executionLog.shift();
  }

  getCatalog() {
    return Object.entries(PIPELINES).map(([name, p]) => ({
      name, description: p.description, schedule: p.schedule,
    }));
  }

  getExecutionLog(limit = 20) {
    return [...this._executionLog].reverse().slice(0, limit);
  }

  getStats() {
    const log = this._executionLog;
    return {
      totalRuns:    log.length,
      successRate:  log.length ? (log.filter(e => e.status === 'success').length / log.length * 100).toFixed(1) + '%' : 'N/A',
      totalLoaded:  log.reduce((s, e) => s + (e.loadedCount || 0), 0),
    };
  }
}

module.exports = { pipelineRunner: new PipelineRunner(), PIPELINES };
