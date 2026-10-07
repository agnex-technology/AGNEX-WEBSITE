/**
 * Phase 121/122 — Enterprise AI Architecture
 * OpenAI Provider Adapter (also compatible with Azure OpenAI & OpenRouter)
 * 
 * Supports: gpt-4o, gpt-4o-mini, o3-mini, text-embedding-3-large
 * Set OPENAI_BASE_URL to point to Azure OpenAI or OpenRouter endpoints.
 */

class OpenAIProvider {
  constructor() {
    this.name = 'openai';
    this.apiKey = process.env.OPENAI_API_KEY || '';
    this.baseUrl = process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1';
    this.defaultModel = 'gpt-4o-mini';
    this.embeddingModel = 'text-embedding-3-small';
    this.isAvailable = !!process.env.OPENAI_API_KEY;
    this.supportedModels = ['gpt-4o', 'gpt-4o-mini', 'o3-mini', 'o4-mini'];
  }

  async healthCheck() {
    if (!this.isAvailable) return false;
    try {
      const res = await this._fetch('/models', { method: 'GET' });
      return res.ok;
    } catch {
      return false;
    }
  }

  async complete({ model, messages, systemPrompt, temperature = 0.7, maxTokens = 4096, stream = false }) {
    if (!this.isAvailable) throw new Error('OpenAIProvider: OPENAI_API_KEY not configured');

    const modelId = model || this.defaultModel;
    const body = {
      model: modelId,
      messages: [
        ...(systemPrompt ? [{ role: 'system', content: systemPrompt }] : []),
        ...messages,
      ],
      temperature,
      max_tokens: maxTokens,
      stream,
    };

    const res = await this._fetch('/chat/completions', {
      method: 'POST',
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(`OpenAIProvider: ${error.error?.message || 'Unknown error'}`);
    }

    if (stream) {
      return { stream: res.body, provider: this.name, model: modelId };
    }

    const data = await res.json();
    const choice = data.choices[0];
    const usage = data.usage || {};

    return {
      content: choice.message.content,
      provider: this.name,
      model: modelId,
      usage: {
        inputTokens: usage.prompt_tokens || 0,
        outputTokens: usage.completion_tokens || 0,
        totalTokens: usage.total_tokens || 0,
      },
    };
  }

  async embed(text) {
    if (!this.isAvailable) return Array(1536).fill(0);
    const res = await this._fetch('/embeddings', {
      method: 'POST',
      body: JSON.stringify({ model: this.embeddingModel, input: text }),
    });
    const data = await res.json();
    return data.data[0].embedding;
  }

  getCostPerMToken(model) {
    const pricing = {
      'gpt-4o':      { input: 2.50, output: 10.00 },
      'gpt-4o-mini': { input: 0.15, output: 0.60  },
      'o3-mini':     { input: 1.10, output: 4.40  },
    };
    return pricing[model] || pricing[this.defaultModel];
  }

  async _fetch(path, options = {}) {
    const { default: fetch } = await import('node-fetch').catch(() => ({ default: globalThis.fetch }));
    return fetch(`${this.baseUrl}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
        ...(options.headers || {}),
      },
    });
  }
}

module.exports = new OpenAIProvider();
