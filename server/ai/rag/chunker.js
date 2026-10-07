/**
 * Phase 123 — Enterprise RAG Platform
 * Document Chunker
 * 
 * Splits documents into semantically meaningful chunks for embedding.
 * Strategies: fixed-size, recursive, sentence-aware, overlap.
 */

class DocumentChunker {
  /**
   * Chunk a document into overlapping segments
   * @param {string} text - Full document text
   * @param {object} options
   * @param {number} options.chunkSize - Max chars per chunk (default 1000)
   * @param {number} options.overlap   - Overlap chars between chunks (default 150)
   * @param {string} options.strategy  - 'recursive'|'sentence'|'fixed'
   * @returns {string[]}
   */
  chunk(text, { chunkSize = 1000, overlap = 150, strategy = 'recursive' } = {}) {
    if (!text || text.trim().length === 0) return [];

    switch (strategy) {
      case 'sentence': return this._sentenceChunk(text, chunkSize, overlap);
      case 'fixed':    return this._fixedChunk(text, chunkSize, overlap);
      case 'recursive':
      default:         return this._recursiveChunk(text, chunkSize, overlap);
    }
  }

  /** Recursive splitting: tries paragraphs → sentences → words */
  _recursiveChunk(text, chunkSize, overlap) {
    const separators = ['\n\n', '\n', '. ', ' '];
    for (const sep of separators) {
      const parts = text.split(sep).filter(Boolean);
      if (parts.length > 1) {
        return this._mergeChunks(parts, sep, chunkSize, overlap);
      }
    }
    return this._fixedChunk(text, chunkSize, overlap);
  }

  /** Sentence-aware chunking */
  _sentenceChunk(text, chunkSize, overlap) {
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    return this._mergeChunks(sentences, ' ', chunkSize, overlap);
  }

  /** Fixed-size chunking with overlap */
  _fixedChunk(text, chunkSize, overlap) {
    const chunks = [];
    let i = 0;
    while (i < text.length) {
      chunks.push(text.slice(i, i + chunkSize));
      i += chunkSize - overlap;
    }
    return chunks;
  }

  _mergeChunks(parts, sep, chunkSize, overlap) {
    const chunks = [];
    let current = '';
    for (const part of parts) {
      if ((current + sep + part).length > chunkSize && current.length > 0) {
        chunks.push(current.trim());
        // Start new chunk with overlap
        const words = current.split(' ');
        const overlapWords = words.slice(-Math.ceil(overlap / 6));
        current = overlapWords.join(' ') + sep + part;
      } else {
        current = current ? current + sep + part : part;
      }
    }
    if (current.trim()) chunks.push(current.trim());
    return chunks;
  }
}

module.exports = new DocumentChunker();
