/**
 * Phase 121/122 — Enterprise AI Architecture
 * Anthropic Provider Adapter (Claude)
 * 
 * Supports: claude-opus-4-5, claude-sonnet-4-5, claude-haiku-3-5
 */

class AnthropicProvider {
  constructor() {
    this.name = 'anthropic';
    this.apiKey = process.env.ANTHROPIC_API_KEY || '';
    this.baseUrl = 'https://api.anthropic.com/v1';
    this.defaultModel = 'claude-haiku-3-5';
    this.isAvailable = !!process.env.ANTHROPIC_API_KEY;
    this.apiVersion = '2023-06-01';
    this.supportedModels = ['claude-opus-4-5', 'claude-sonnet-4-5', 'claude-haiku-3-5'];
  }

  async healthCheck() {
    return this.isAvailable;
  }

  async complete({ model, messages, systemPrompt, temperature = 0.7, maxTokens = 4096, stream = false }) {
    if (!this.isAvailable) throw new Error('AnthropicProvider: ANTHROPIC_API_KEY not configured');

    const modelId = model || this.defaultModel;
    const body = {
      model: modelId,
      max_tokens: maxTokens,
      temperature,
      system: systemPrompt || 'You are a helpful assistant.',
      messages,
      stream,
    };

    const { default: fetch } = await import('node-fetch').catch(() => ({ default: globalThis.fetch }));
    const res = await fetch(`${this.baseUrl}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
        'anthropic-version': this.apiVersion,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(`AnthropicProvider: ${error.error?.message || 'Unknown error'}`);
    }

    if (stream) return { stream: res.body, provider: this.name, model: modelId };

    const data = await res.json();
    const content = data.content[0]?.text || '';
    const usage = data.usage || {};

    return {
      content,
      provider: this.name,
      model: modelId,
      usage: {
        inputTokens: usage.input_tokens || 0,
        outputTokens: usage.output_tokens || 0,
        totalTokens: (usage.input_tokens || 0) + (usage.output_tokens || 0),
      },
    };
  }

  async embed() {
    throw new Error('AnthropicProvider: Embeddings not supported. Use Gemini or OpenAI.');
  }

  getCostPerMToken(model) {
    const pricing = {
      'claude-opus-4-5':   { input: 15.00, output: 75.00 },
      'claude-sonnet-4-5': { input: 3.00,  output: 15.00 },
      'claude-haiku-3-5':  { input: 0.80,  output: 4.00  },
    };
    return pricing[model] || pricing[this.defaultModel];
  }
}

module.exports = new AnthropicProvider();
