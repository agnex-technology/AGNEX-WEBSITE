/**
 * Phase 121 — Enterprise AI Architecture
 * Model Registry — single source of truth for all registered AI providers.
 * 
 * Decouples the rest of the system from specific provider implementations.
 * New providers are registered here; all other code uses the registry.
 */

const geminiProvider   = require('./providers/gemini.provider');
const openaiProvider   = require('./providers/openai.provider');
const anthropicProvider = require('./providers/anthropic.provider');

class ModelRegistry {
  constructor() {
    /** @type {Map<string, object>} */
    this._providers = new Map();
    /** @type {Map<string, string>} */
    this._modelToProvider = new Map();

    // Register all built-in providers
    this.register(geminiProvider);
    this.register(openaiProvider);
    this.register(anthropicProvider);
  }

  /**
   * Register a provider and index all its models
   * @param {object} provider - Must implement { name, supportedModels, complete, embed, healthCheck, getCostPerMToken }
   */
  register(provider) {
    this._providers.set(provider.name, provider);
    (provider.supportedModels || []).forEach(model => {
      this._modelToProvider.set(model, provider.name);
    });
    console.log(JSON.stringify({ level: 'info', message: `[ModelRegistry] Registered provider: ${provider.name}`, models: provider.supportedModels }));
  }

  /** Get a provider by name */
  getProvider(name) {
    const provider = this._providers.get(name);
    if (!provider) throw new Error(`ModelRegistry: Unknown provider "${name}"`);
    return provider;
  }

  /** Resolve the provider for a given model ID */
  resolveProvider(modelId) {
    const providerName = this._modelToProvider.get(modelId);
    if (!providerName) throw new Error(`ModelRegistry: No provider registered for model "${modelId}"`);
    return this.getProvider(providerName);
  }

  /** Get all available (configured) providers */
  getAvailableProviders() {
    return Array.from(this._providers.values()).filter(p => p.isAvailable);
  }

  /** Health check across all providers */
  async healthCheckAll() {
    const results = {};
    for (const [name, provider] of this._providers) {
      results[name] = await provider.healthCheck().catch(() => false);
    }
    return results;
  }

  /** List all registered providers and their models */
  getCatalog() {
    return Array.from(this._providers.values()).map(p => ({
      name: p.name,
      available: p.isAvailable,
      defaultModel: p.defaultModel,
      models: p.supportedModels || [],
    }));
  }
}

module.exports = new ModelRegistry();
