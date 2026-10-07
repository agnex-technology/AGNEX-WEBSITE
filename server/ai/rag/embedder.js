/**
 * Phase 123 — Enterprise RAG Platform
 * Embedder — generates and caches embedding vectors
 * 
 * Uses the AI Gateway for provider-agnostic embedding generation.
 * Implements embedding cache to avoid redundant API calls.
 */

const aiGateway = require('../gateway/ai.gateway');

class Embedder {
  constructor() {
    // Simple LRU-style in-memory cache
    this._cache = new Map();
    this._maxCacheSize = 5000;
  }

  /**
   * Generate embedding for a single text
   * @param {string} text
   * @returns {Promise<number[]>}
   */
  async embed(text) {
    const key = this._hashText(text);
    if (this._cache.has(key)) return this._cache.get(key);

    const vector = await aiGateway.embed(text);

    // Evict oldest entries if cache is full
    if (this._cache.size >= this._maxCacheSize) {
      const firstKey = this._cache.keys().next().value;
      this._cache.delete(firstKey);
    }

    this._cache.set(key, vector);
    return vector;
  }

  /**
   * Batch embed multiple texts
   * @param {string[]} texts
   * @returns {Promise<number[][]>}
   */
  async embedBatch(texts) {
    return Promise.all(texts.map(t => this.embed(t)));
  }

  /**
   * Cosine similarity between two vectors
   * @param {number[]} a
   * @param {number[]} b
   * @returns {number} 0–1
   */
  cosineSimilarity(a, b) {
    if (a.length !== b.length) throw new Error('Embedder: Vector dimension mismatch');
    let dot = 0, normA = 0, normB = 0;
    for (let i = 0; i < a.length; i++) {
      dot   += a[i] * b[i];
      normA += a[i] * a[i];
      normB += b[i] * b[i];
    }
    return dot / (Math.sqrt(normA) * Math.sqrt(normB) + 1e-10);
  }

  _hashText(text) {
    let h = 0;
    for (let i = 0; i < text.length; i++) { h = (Math.imul(31, h) + text.charCodeAt(i)) | 0; }
    return `emb_${h}`;
  }

  getCacheStats() {
    return { size: this._cache.size, maxSize: this._maxCacheSize };
  }
}

module.exports = new Embedder();
