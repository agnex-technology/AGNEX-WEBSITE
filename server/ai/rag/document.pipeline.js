/**
 * Phase 123 — Enterprise RAG Platform
 * Document Pipeline — ingest, chunk, embed, and index documents into the knowledge base
 * 
 * In production: vectors stored in pgvector (PostgreSQL) or Pinecone/Weaviate.
 * For now: in-memory vector store as a portable, dependency-free baseline.
 */

const chunker  = require('./chunker');
const embedder = require('./embedder');

class DocumentPipeline {
  constructor() {
    // In-memory vector store: [{ id, documentId, chunkIndex, text, vector, metadata }]
    this._vectorStore = [];
    this._documents   = new Map(); // documentId → { title, source, version, createdAt }
  }

  /**
   * Ingest a document into the knowledge base
   * @param {object} doc - { id, title, content, source, metadata }
   * @returns {Promise<{chunks: number, documentId: string}>}
   */
  async ingest(doc) {
    const { id: documentId, title, content, source, metadata = {} } = doc;

    // Remove old chunks for this document (for re-indexing / versioning)
    this._vectorStore = this._vectorStore.filter(c => c.documentId !== documentId);

    // Store document record
    this._documents.set(documentId, {
      title, source, metadata,
      version: (this._documents.get(documentId)?.version || 0) + 1,
      createdAt: new Date().toISOString(),
    });

    // Chunk the document
    const chunks = chunker.chunk(content, { chunkSize: 1000, overlap: 150, strategy: 'recursive' });

    // Embed all chunks (batch)
    const vectors = await embedder.embedBatch(chunks);

    // Store in vector store
    chunks.forEach((chunkText, idx) => {
      this._vectorStore.push({
        id: `${documentId}_chunk_${idx}`,
        documentId,
        chunkIndex: idx,
        text: chunkText,
        vector: vectors[idx],
        metadata: { title, source, ...metadata },
      });
    });

    console.log(JSON.stringify({ level: 'info', message: '[RAG] Document ingested', documentId, title, chunks: chunks.length }));
    return { chunks: chunks.length, documentId };
  }

  /**
   * Retrieve top-k relevant chunks for a query
   * @param {string} query
   * @param {number} topK
   * @returns {Promise<Array>}
   */
  async retrieve(query, topK = 5) {
    const queryVector = await embedder.embed(query);

    // Compute cosine similarity against all stored chunks
    const scored = this._vectorStore.map(chunk => ({
      ...chunk,
      score: embedder.cosineSimilarity(queryVector, chunk.vector),
    }));

    // Sort descending by score, return top-k
    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, topK)
      .map(({ id, documentId, text, score, metadata }) => ({ id, documentId, text, score, metadata }));
  }

  /** List all indexed documents */
  listDocuments() {
    return Array.from(this._documents.entries()).map(([id, doc]) => ({ id, ...doc }));
  }

  /** Remove a document and all its chunks */
  deleteDocument(documentId) {
    this._documents.delete(documentId);
    const removed = this._vectorStore.filter(c => c.documentId === documentId).length;
    this._vectorStore = this._vectorStore.filter(c => c.documentId !== documentId);
    return { removed };
  }

  getStats() {
    return {
      documents: this._documents.size,
      chunks: this._vectorStore.length,
      embedding: embedder.getCacheStats(),
    };
  }
}

module.exports = new DocumentPipeline();
