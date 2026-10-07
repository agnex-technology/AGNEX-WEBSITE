/**
 * Phase 128 — Enterprise AI Governance
 * AI Audit Logger — immutable audit trail for all AI interactions
 * 
 * Logs: inference events, safety events, cost events, agent events
 * In production: writes to SIEM/CloudWatch/Datadog
 */

class AIAuditLogger {
  constructor() {
    this._log = [];
    this.MAX_ENTRIES = 10000;
  }

  /**
   * Log an AI audit event
   * @param {object} event
   * @param {string} event.type - 'inference'|'cache_hit'|'safety_block'|'agent_run'|'all_providers_failed'
   */
  log(event) {
    const entry = {
      id: `audit_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      timestamp: new Date().toISOString(),
      ...event,
    };

    // Structured log output (compatible with ELK/Datadog)
    console.log(JSON.stringify({ level: 'info', type: 'ai_audit', ...entry }));

    this._log.push(entry);
    if (this._log.length > this.MAX_ENTRIES) this._log.shift();
  }

  /** Query the audit log */
  query({ type, startDate, endDate, limit = 50 } = {}) {
    let results = [...this._log].reverse();
    if (type) results = results.filter(e => e.type === type);
    if (startDate) results = results.filter(e => new Date(e.timestamp) >= new Date(startDate));
    if (endDate)   results = results.filter(e => new Date(e.timestamp) <= new Date(endDate));
    return results.slice(0, limit);
  }

  /** Compliance summary for governance reports */
  getComplianceSummary() {
    const total    = this._log.length;
    const blocked  = this._log.filter(e => e.type === 'safety_block').length;
    const cached   = this._log.filter(e => e.type === 'cache_hit').length;
    const failed   = this._log.filter(e => e.type === 'all_providers_failed').length;
    return { total, blocked, cached, failed, successRate: total ? (((total - failed) / total) * 100).toFixed(2) + '%' : 'N/A' };
  }
}

const auditLogger = new AIAuditLogger();

/** Convenience function used by AI Gateway */
const logAIEvent = (event) => auditLogger.log(event);

module.exports = { auditLogger, logAIEvent };
