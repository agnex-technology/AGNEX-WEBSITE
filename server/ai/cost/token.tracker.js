/**
 * Phase 129 — Enterprise AI Cost Optimization
 * Token Tracker — real-time token usage and cost accounting per provider/model
 */

class TokenTracker {
  constructor() {
    // { providerModel: { inputTokens, outputTokens, requests, totalCostUSD, latencies[] } }
    this._records = new Map();
    this._sessionStart = Date.now();
  }

  /**
   * Record a completed inference call
   * @param {object} params
   * @param {string} params.provider
   * @param {string} params.model
   * @param {object} params.usage - { inputTokens, outputTokens, totalTokens }
   * @param {string} params.task
   * @param {number} params.latencyMs
   */
  record({ provider, model, usage, task, latencyMs }) {
    const key = `${provider}:${model}`;
    const existing = this._records.get(key) || {
      provider, model, inputTokens: 0, outputTokens: 0, requests: 0, totalCostUSD: 0, latencies: [],
    };

    existing.inputTokens  += usage.inputTokens  || 0;
    existing.outputTokens += usage.outputTokens || 0;
    existing.requests     += 1;
    existing.latencies.push(latencyMs);

    // Phase 129 — Cost calculation
    const cost = this._calculateCost(provider, model, usage);
    existing.totalCostUSD += cost;

    this._records.set(key, existing);
  }

  _calculateCost(provider, model, usage) {
    // Cost per 1M tokens (USD) — updated pricing tables
    const pricing = {
      'gemini:gemini-2.5-flash': { input: 0.075,  output: 0.30  },
      'gemini:gemini-2.5-pro':   { input: 1.25,   output: 5.00  },
      'openai:gpt-4o':           { input: 2.50,   output: 10.00 },
      'openai:gpt-4o-mini':      { input: 0.15,   output: 0.60  },
      'anthropic:claude-haiku-3-5':  { input: 0.80,  output: 4.00 },
      'anthropic:claude-sonnet-4-5': { input: 3.00,  output: 15.00 },
    };

    const key = `${provider}:${model}`;
    const rate = pricing[key] || { input: 1.00, output: 3.00 };
    const inputCost  = ((usage.inputTokens  || 0) / 1_000_000) * rate.input;
    const outputCost = ((usage.outputTokens || 0) / 1_000_000) * rate.output;
    return inputCost + outputCost;
  }

  /** Aggregate usage summary */
  getSummary() {
    const records = Array.from(this._records.values());
    const totalCostUSD = records.reduce((sum, r) => sum + r.totalCostUSD, 0);
    const totalTokens  = records.reduce((sum, r) => sum + r.inputTokens + r.outputTokens, 0);
    const totalRequests = records.reduce((sum, r) => sum + r.requests, 0);

    return {
      totalCostUSD:    parseFloat(totalCostUSD.toFixed(6)),
      totalTokens,
      totalRequests,
      sessionUptimeMs: Date.now() - this._sessionStart,
      byModel: records.map(r => ({
        provider: r.provider,
        model: r.model,
        requests: r.requests,
        inputTokens: r.inputTokens,
        outputTokens: r.outputTokens,
        totalCostUSD: parseFloat(r.totalCostUSD.toFixed(6)),
        avgLatencyMs: r.latencies.length > 0
          ? Math.round(r.latencies.reduce((s, l) => s + l, 0) / r.latencies.length)
          : 0,
      })),
    };
  }

  /** Phase 129 — Identify cost optimization opportunities */
  getOptimizationRecommendations() {
    const recommendations = [];
    for (const record of this._records.values()) {
      const avgTokens = (record.inputTokens + record.outputTokens) / Math.max(record.requests, 1);
      if (record.model === 'gpt-4o' && avgTokens < 500) {
        recommendations.push({ type: 'model_downgrade', message: `${record.requests} requests to gpt-4o with < 500 avg tokens — consider gpt-4o-mini for 94% cost savings`, savingsUSD: record.totalCostUSD * 0.94 });
      }
      if (record.provider === 'anthropic' && record.model.includes('opus') && record.requests > 100) {
        recommendations.push({ type: 'model_downgrade', message: 'High-volume claude-opus usage — consider claude-haiku for 95% cost reduction', savingsUSD: record.totalCostUSD * 0.95 });
      }
    }
    return recommendations;
  }
}

module.exports = new TokenTracker();
