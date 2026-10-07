/**
 * Phase 121 — Enterprise AI Architecture
 * Gemini Provider (Google DeepMind)
 * 
 * Adapter implementing the IModelProvider interface for all Gemini models.
 * Supports: gemini-2.5-flash, gemini-2.5-pro, text-embedding-004
 */

const { GoogleGenerativeAI } = require('@google/generative-ai');

class GeminiProvider {
  constructor() {
    this.name = 'gemini';
    this.client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
    this.defaultModel = 'gemini-2.5-flash';
    this.embeddingModel = 'text-embedding-004';
    this.isAvailable = true; // Force to true to allow mock
    this.hasKey = !!process.env.GEMINI_API_KEY;
    this.supportedModels = ['gemini-2.5-flash', 'gemini-2.5-pro', 'gemini-2.0-flash'];
  }

  /** @returns {Promise<boolean>} */
  async healthCheck() {
    if (!this.isAvailable) return false;
    try {
      const model = this.client.getGenerativeModel({ model: this.defaultModel });
      await model.generateContent('ping');
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Generate a chat completion
   * @param {object} options - { model, messages, systemPrompt, temperature, maxTokens, stream }
   * @returns {Promise<{content: string, usage: {inputTokens: number, outputTokens: number}}>}
   */
  async complete({ model, messages, systemPrompt, temperature = 0.7, maxTokens = 8192, stream = false }) {
    if (!this.hasKey) {
      return {
        content: "[ MOCK MODE ENABLED ] I am the AGNEX Neural Engine. I have received your query. In a production environment with a valid GEMINI_API_KEY, I would process this naturally.",
        provider: this.name,
        model: model || this.defaultModel,
        usage: { inputTokens: 10, outputTokens: 25, totalTokens: 35 }
      };
    }

    const modelId = model || this.defaultModel;
    const geminiModel = this.client.getGenerativeModel({
      model: modelId,
      systemInstruction: systemPrompt,
      generationConfig: { temperature, maxOutputTokens: maxTokens },
    });

    // Convert messages to Gemini history format
    const history = messages.slice(0, -1).map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));
    const lastMessage = messages[messages.length - 1];

    const chat = geminiModel.startChat({ history });

    if (stream) {
      const streamResult = await chat.sendMessageStream(lastMessage.content);
      return { stream: streamResult.stream, provider: this.name, model: modelId };
    }

    const result = await chat.sendMessage(lastMessage.content);
    const response = result.response;
    const usage = response.usageMetadata || {};

    return {
      content: response.text(),
      provider: this.name,
      model: modelId,
      usage: {
        inputTokens: usage.promptTokenCount || 0,
        outputTokens: usage.candidatesTokenCount || 0,
        totalTokens: usage.totalTokenCount || 0,
      },
    };
  }

  /**
   * Generate embedding vector for text
   * @param {string} text
   * @returns {Promise<number[]>}
   */
  async embed(text) {
    if (!this.isAvailable) return Array(768).fill(0); // mock vector

    const model = this.client.getGenerativeModel({ model: this.embeddingModel });
    const result = await model.embedContent(text);
    return result.embedding.values;
  }

  /** Estimated cost per 1M tokens (USD) */
  getCostPerMToken(model) {
    const pricing = {
      'gemini-2.5-flash': { input: 0.075, output: 0.30 },
      'gemini-2.5-pro':   { input: 1.25,  output: 5.00 },
      'gemini-2.0-flash': { input: 0.10,  output: 0.40 },
    };
    return pricing[model] || pricing[this.defaultModel];
  }
}

module.exports = new GeminiProvider();
