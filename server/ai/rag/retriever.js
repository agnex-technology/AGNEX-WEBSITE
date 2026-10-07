/**
 * Phase 123 — Enterprise RAG Platform
 * Retriever — semantic retrieval with ranking and citation generation
 * 
 * Phase 125 integration: uses Prompt Service to build RAG system prompts.
 */

const pipeline = require('./document.pipeline');

class Retriever {
  /**
   * Retrieve context and build an augmented prompt for RAG
   * @param {string} query
   * @param {object} options
   * @param {number} options.topK - Number of chunks to retrieve
   * @param {number} options.scoreThreshold - Min similarity score (0-1)
   * @returns {Promise<{context: string, citations: Array, sources: string[]}>}
   */
  async retrieve(query, { topK = 5, scoreThreshold = 0.60 } = {}) {
    const chunks = await pipeline.retrieve(query, topK);

    // Filter by minimum score threshold
    const relevant = chunks.filter(c => c.score >= scoreThreshold);

    if (relevant.length === 0) {
      return { context: '', citations: [], sources: [], hasContext: false };
    }

    // Build numbered context block
    const contextParts = relevant.map((chunk, idx) => (
      `[${idx + 1}] Source: "${chunk.metadata?.title || chunk.documentId}" | Relevance: ${(chunk.score * 100).toFixed(1)}%\n${chunk.text}`
    ));

    const context = contextParts.join('\n\n---\n\n');

    // Build citation list
    const citations = relevant.map((chunk, idx) => ({
      number: idx + 1,
      documentId: chunk.documentId,
      title: chunk.metadata?.title,
      source: chunk.metadata?.source,
      score: parseFloat(chunk.score.toFixed(4)),
      snippet: chunk.text.slice(0, 150) + '...',
    }));

    const sources = [...new Set(relevant.map(c => c.metadata?.title || c.documentId))];

    return { context, citations, sources, hasContext: true };
  }

  /**
   * Build a RAG-augmented system prompt
   * @param {string} baseSystemPrompt
   * @param {string} context
   * @returns {string}
   */
  buildRagPrompt(baseSystemPrompt, context) {
    if (!context) return baseSystemPrompt;
    return `${baseSystemPrompt}

## Retrieved Knowledge Base Context
Use the following retrieved context to answer the user's question accurately.
Always cite the source number [N] when using information from context.
If the answer is not in the context, say "I don't have enough information on that topic."

${context}

## Instructions
- Be accurate and cite sources using [N] format
- Do not fabricate information not present in the context
- If multiple sources agree, cite all relevant ones`;
  }
}

module.exports = new Retriever();
