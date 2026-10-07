/**
 * Phase 122 — Enterprise Multi-Model AI Gateway
 * 
 * The AI Gateway is the single entry point for all AI inference.
 * Responsibilities:
 *  - Model routing (route to cheapest/fastest/best model per task)
 *  - Automatic provider failover
 *  - Retry logic with exponential backoff
 *  - Per-request cost & token tracking
 *  - Latency monitoring
 *  - Streaming support
 *  - Response caching (hot-path cache)
 */

const registry       = require('../model.registry');
const tokenTracker   = require('../cost/token.tracker');
const { piiGuard }   = require('../governance/pii.guard');
const { promptInjectionGuard } = require('../governance/prompt.injection.guard');
const { logAIEvent } = require('../governance/audit.logger');

// Simple in-memory response cache (TTL-based)
const responseCache = new Map();
const CACHE_TTL_MS  = 5 * 60 * 1000; // 5 minutes

class AIGateway {
  constructor() {
    // Routing table: task type → preferred provider chain (ordered by priority)
    this.routingTable = {
      chat:       ['gemini', 'openai', 'anthropic'],
      embedding:  ['gemini', 'openai'],
      reasoning:  ['anthropic', 'openai', 'gemini'],
      fast:       ['gemini', 'openai'],
      code:       ['anthropic', 'openai', 'gemini'],
    };
  }

  /**
   * Main inference entry point
   * @param {object} options
   * @param {string} options.task - 'chat'|'reasoning'|'fast'|'code'
   * @param {Array}  options.messages
   * @param {string} options.systemPrompt
   * @param {string} [options.model] - Pin to a specific model (bypasses routing)
   * @param {boolean} [options.stream]
   * @param {boolean} [options.cache] - Enable response cache
   * @param {object} [options.context] - Request context for logging
   */
  async complete(options) {
    const { task = 'chat', messages, systemPrompt, model: pinnedModel, stream = false, cache = false, context = {} } = options;
    const startTime = Date.now();

    // Phase 128 — Governance: safety checks
    const lastUserMessage = messages.findLast(m => m.role === 'user')?.content || '';
    const piiScan = piiGuard.scan(lastUserMessage);
    if (piiScan.blocked) {
      return { content: piiScan.message, blocked: true, reason: 'pii_detected' };
    }
    const injectionScan = promptInjectionGuard.scan(lastUserMessage);
    if (injectionScan.blocked) {
      return { content: injectionScan.message, blocked: true, reason: 'prompt_injection' };
    }

    // Phase 129 — Cache check
    const cacheKey = cache ? this._cacheKey(messages, systemPrompt, pinnedModel) : null;
    if (cacheKey && responseCache.has(cacheKey)) {
      const cached = responseCache.get(cacheKey);
      if (Date.now() - cached.timestamp < CACHE_TTL_MS) {
        logAIEvent({ type: 'cache_hit', task, ...context });
        return { ...cached.result, cached: true };
      }
      responseCache.delete(cacheKey);
    }

    // Resolve provider chain
    const providerChain = pinnedModel
      ? [registry.resolveProvider(pinnedModel)]
      : this._resolveChain(task);

    let lastError;
    for (const provider of providerChain) {
      try {
        const resolvedModel = pinnedModel || provider.defaultModel;
        const result = await this._invokeWithRetry(provider, { messages, systemPrompt, model: resolvedModel, stream }, 3);

        const latencyMs = Date.now() - startTime;

        // Phase 129 — Cost/token tracking
        if (result.usage) {
          tokenTracker.record({
            provider: result.provider,
            model: result.model,
            usage: result.usage,
            task,
            latencyMs,
            ...context,
          });
        }

        // Phase 127 — Evaluation metrics
        logAIEvent({ type: 'inference', task, provider: result.provider, model: result.model, latencyMs, tokens: result.usage?.totalTokens, ...context });

        // Cache successful non-streaming response
        if (cacheKey && !stream) {
          responseCache.set(cacheKey, { result, timestamp: Date.now() });
        }

        return result;

      } catch (err) {
        lastError = err;
        console.error(JSON.stringify({ level: 'warn', message: `[AIGateway] Provider ${provider.name} failed — trying next`, error: err.message }));
      }
    }

    logAIEvent({ type: 'all_providers_failed', task, error: lastError?.message, ...context });
    throw new Error(`AIGateway: All providers exhausted. Last error: ${lastError?.message}`);
  }

  /**
   * Embedding entry point (always uses embedding-capable providers)
   */
  async embed(text) {
    const providers = this.routingTable.embedding.map(name => {
      try { return registry.getProvider(name); } catch { return null; }
    }).filter(Boolean);

    for (const provider of providers) {
      try {
        return await provider.embed(text);
      } catch (err) {
        console.error(JSON.stringify({ level: 'warn', message: `[AIGateway] Embed failed on ${provider.name}`, error: err.message }));
      }
    }
    throw new Error('AIGateway: All embedding providers failed');
  }

  /** Resolve ordered provider chain for a task, skipping unavailable providers */
  _resolveChain(task) {
    const names = this.routingTable[task] || this.routingTable.chat;
    return names.map(name => {
      try { return registry.getProvider(name); } catch { return null; }
    }).filter(p => p && p.isAvailable);
  }

  /** Invoke a provider with exponential-backoff retry */
  async _invokeWithRetry(provider, args, maxRetries) {
    let attempt = 0;
    while (attempt < maxRetries) {
      try {
        return await provider.complete(args);
      } catch (err) {
        attempt++;
        if (attempt >= maxRetries) throw err;
        const delay = Math.pow(2, attempt) * 200; // 200ms, 400ms, 800ms
        await new Promise(r => setTimeout(r, delay));
      }
    }
  }

  _cacheKey(messages, systemPrompt, model) {
    const payload = JSON.stringify({ messages, systemPrompt, model });
    // Simple hash using built-in (no crypto dependency needed)
    let hash = 0;
    for (let i = 0; i < payload.length; i++) {
      hash = ((hash << 5) - hash) + payload.charCodeAt(i);
      hash |= 0;
    }
    return `ai_cache_${hash}`;
  }

  /** Phase 122 — Gateway health dashboard data */
  async getHealthStatus() {
    return {
      providers: await registry.healthCheckAll(),
      catalog: registry.getCatalog(),
      cacheSize: responseCache.size,
      costSummary: tokenTracker.getSummary(),
    };
  }
}

module.exports = new AIGateway();
