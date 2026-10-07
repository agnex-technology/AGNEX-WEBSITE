/**
 * Phase 126 — Enterprise Multi-Agent Platform
 * Agent Registry — manages agent discovery, routing, and health monitoring
 */

const { RecruitmentAgent, CrmAgent } = require('./specialist.agents');
const BaseAgent = require('./base.agent');

class AgentRegistry {
  constructor() {
    /** @type {Map<string, BaseAgent>} */
    this._agents = new Map();
    this._executionLog = []; // Last 100 executions
    this.MAX_LOG = 100;

    // Register built-in agents
    this.register(RecruitmentAgent);
    this.register(CrmAgent);
  }

  /**
   * Register an agent
   * @param {BaseAgent} agent
   */
  register(agent) {
    this._agents.set(agent.name, agent);
    console.log(JSON.stringify({ level: 'info', message: `[AgentRegistry] Registered agent: ${agent.name}` }));
  }

  /**
   * Get an agent by name
   * @param {string} name
   * @returns {BaseAgent}
   */
  get(name) {
    const agent = this._agents.get(name);
    if (!agent) throw new Error(`AgentRegistry: Unknown agent "${name}"`);
    return agent;
  }

  /**
   * Execute an agent and log the result
   * @param {string} agentName
   * @param {object} params
   */
  async execute(agentName, params) {
    const agent = this.get(agentName);
    const startTime = Date.now();

    try {
      const result = await agent.run(params);
      const entry = { agentName, status: 'success', latencyMs: Date.now() - startTime, timestamp: new Date().toISOString() };
      this._log(entry);
      return result;
    } catch (err) {
      const entry = { agentName, status: 'error', error: err.message, latencyMs: Date.now() - startTime, timestamp: new Date().toISOString() };
      this._log(entry);
      throw err;
    }
  }

  _log(entry) {
    this._executionLog.push(entry);
    if (this._executionLog.length > this.MAX_LOG) this._executionLog.shift();
  }

  getCatalog() {
    return Array.from(this._agents.values()).map(a => ({
      name: a.name,
      task: a.task,
      tools: a.tools,
      promptKey: a.promptKey,
    }));
  }

  getExecutionLog() {
    return [...this._executionLog].reverse();
  }

  getStats() {
    const log = this._executionLog;
    const successes = log.filter(e => e.status === 'success');
    const avgLatency = successes.length > 0
      ? Math.round(successes.reduce((s, e) => s + e.latencyMs, 0) / successes.length)
      : 0;
    return {
      totalAgents: this._agents.size,
      totalExecutions: log.length,
      successRate: log.length ? (successes.length / log.length * 100).toFixed(1) + '%' : 'N/A',
      avgLatencyMs: avgLatency,
    };
  }
}

module.exports = new AgentRegistry();
