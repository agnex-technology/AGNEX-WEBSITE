/**
 * Phase 125 — Enterprise Prompt Engineering Platform
 * Prompt Service — resolves, assembles, and validates prompts at runtime
 * 
 * Features:
 * - Variable interpolation with {{variable}} syntax
 * - Prompt injection sanitization before rendering
 * - Versioned prompt resolution
 * - Prompt analytics (usage tracking)
 */

const SYSTEM_PROMPTS = require('./system.prompts');

class PromptService {
  constructor() {
    this._usageStats = new Map(); // promptKey → { uses, lastUsed }
  }

  /**
   * Resolve a system prompt by key and interpolate variables
   * @param {string} key - e.g. 'vantrex.assistant.v1'
   * @param {object} variables - Variable values to interpolate
   * @returns {string} Rendered system prompt
   */
  resolve(key, variables = {}) {
    const promptDef = SYSTEM_PROMPTS[key];
    if (!promptDef) throw new Error(`PromptService: Unknown prompt key "${key}"`);

    // Track usage
    const stats = this._usageStats.get(key) || { uses: 0, lastUsed: null };
    stats.uses++;
    stats.lastUsed = new Date().toISOString();
    this._usageStats.set(key, stats);

    // Interpolate variables
    let rendered = promptDef.template;
    for (const [varName, value] of Object.entries(variables)) {
      // Sanitize variable values against prompt injection
      const safeValue = this._sanitizeVariable(String(value || ''));
      rendered = rendered.replaceAll(`{{${varName}}}`, safeValue);
    }

    // Replace any remaining unset variables with safe defaults
    rendered = rendered.replace(/\{\{[a-zA-Z_]+\}\}/g, '[Not specified]');

    return rendered;
  }

  /**
   * Build a chat message array from a prompt key + user message
   * @param {string} promptKey
   * @param {string} userMessage
   * @param {object} variables
   * @param {Array} history - Previous conversation messages
   * @returns {{ systemPrompt: string, messages: Array }}
   */
  buildMessages(promptKey, userMessage, variables = {}, history = []) {
    const systemPrompt = this.resolve(promptKey, variables);
    const messages = [
      ...history,
      { role: 'user', content: userMessage },
    ];
    return { systemPrompt, messages };
  }

  /** List all available prompts with metadata */
  list() {
    return Object.entries(SYSTEM_PROMPTS).map(([key, def]) => ({
      key,
      version: def.version,
      description: def.description,
      variables: def.variables,
      tags: def.tags,
      usage: this._usageStats.get(key) || { uses: 0, lastUsed: null },
    }));
  }

  /** Usage analytics for the prompt library */
  getAnalytics() {
    return Object.fromEntries(this._usageStats);
  }

  /** Sanitize user-provided variable values to prevent injection into system prompts */
  _sanitizeVariable(value) {
    return value
      .replace(/```/g, "'''")       // Code block injection
      .replace(/\[INST\]/gi, '')    // LLaMA instruction tags
      .replace(/<\|system\|>/gi, '') // Qwen/Mistral tags
      .slice(0, 500);               // Max variable length
  }
}

module.exports = new PromptService();
