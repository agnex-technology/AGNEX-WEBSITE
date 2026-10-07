/**
 * Phase 126 — Enterprise Multi-Agent Platform
 * Base Agent — abstract foundation for all specialized agents
 * 
 * All agents extend this class and implement the `run(input)` method.
 * Provides: memory integration, prompt resolution, gateway access, tool calling.
 */

const aiGateway    = require('../gateway/ai.gateway');
const promptService = require('../prompts/prompt.service');
const memoryStore  = require('../memory/memory.store');

class BaseAgent {
  /**
   * @param {object} config
   * @param {string} config.name          - Agent identifier
   * @param {string} config.promptKey     - System prompt key from prompt library
   * @param {string} config.task          - Gateway task type: 'chat'|'reasoning'|'code'
   * @param {string[]} [config.tools]     - Tool names this agent can call
   */
  constructor({ name, promptKey, task = 'chat', tools = [] }) {
    this.name      = name;
    this.promptKey = promptKey;
    this.task      = task;
    this.tools     = tools;
  }

  /**
   * Execute the agent
   * @param {object} params
   * @param {string} params.input       - User message / task input
   * @param {object} [params.variables] - Prompt template variables
   * @param {string} [params.sessionId] - Conversation/session ID for memory
   * @param {object} [params.context]   - Additional context metadata
   * @returns {Promise<{output: string, citations: Array, agentName: string, memory: object}>}
   */
  async run({ input, variables = {}, sessionId = 'default', context = {} }) {
    // Recall conversation memory
    const memContext = memoryStore.formatAsContext({ scope: 'conversation', id: `${this.name}:${sessionId}`, limit: 10 });

    // Build messages with memory context prepended
    const history = memContext
      ? [{ role: 'user', content: `[Previous context]:\n${memContext}` }, { role: 'assistant', content: 'Understood. Continuing with that context.' }]
      : [];

    const { systemPrompt, messages } = promptService.buildMessages(this.promptKey, input, variables, history);

    // Call AI Gateway
    const result = await aiGateway.complete({
      task: this.task,
      messages,
      systemPrompt,
      context: { agentName: this.name, sessionId, ...context },
    });

    // Store interaction in memory
    memoryStore.set({ scope: 'conversation', id: `${this.name}:${sessionId}`, entry: { role: 'user', content: input } });
    memoryStore.set({ scope: 'conversation', id: `${this.name}:${sessionId}`, entry: { role: 'assistant', content: result.content } });

    return {
      output:    result.content,
      citations: [],
      agentName: this.name,
      provider:  result.provider,
      model:     result.model,
      usage:     result.usage,
    };
  }
}

module.exports = BaseAgent;
