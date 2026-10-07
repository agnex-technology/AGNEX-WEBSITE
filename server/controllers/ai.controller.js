/**
 * Phase 121–129 — Enterprise AI Controller
 * Replaces the original ai.controller.js with the full enterprise AI stack:
 *   - AI Gateway (multi-model, fallback, cost tracking)
 *   - RAG (document pipeline + retriever + citations)
 *   - Memory (conversation history)
 *   - Prompt Service (versioned templates)
 *   - Agents (recruitment, CRM)
 *   - Governance (PII guard, injection guard)
 *   - Audit logging
 */

const aiGateway     = require('../ai/gateway/ai.gateway');
const promptService = require('../ai/prompts/prompt.service');
const memoryStore   = require('../ai/memory/memory.store');
const retriever     = require('../ai/rag/retriever');
const pipeline      = require('../ai/rag/document.pipeline');
const agentRegistry = require('../ai/agents/agent.registry');
const { auditLogger } = require('../ai/governance/audit.logger');
const tokenTracker  = require('../ai/cost/token.tracker');
const registry      = require('../ai/model.registry');

// ─── Chat with Memory + RAG ───────────────────────────────────────────────────
exports.chat = async (req, res, next) => {
  try {
    const { message, conversationId = 'default', useRag = true, variables = {} } = req.body;
    if (!message) return res.status(400).json({ status: 'error', message: 'Message is required' });

    // Recall conversation memory
    const { entries: history } = memoryStore.get({ scope: 'conversation', id: conversationId, limit: 10 });
    const chatHistory = history.map(e => ({ role: e.role, content: e.content }));

    let systemPrompt, ragContext = null;

    if (useRag) {
      // Retrieve relevant context
      const ragResult = await retriever.retrieve(message, { topK: 3, scoreThreshold: 0.55 });
      systemPrompt = retriever.buildRagPrompt(
        promptService.resolve('agnex.assistant.v1', { organizationName: 'AGNEX Technology', userName: req.user?.name || 'User', userRole: req.user?.role || 'user', ...variables }),
        ragResult.context,
      );
      ragContext = { citations: ragResult.citations, sources: ragResult.sources };
    } else {
      systemPrompt = promptService.resolve('agnex.assistant.v1', { organizationName: 'AGNEX Technology', userName: req.user?.name || 'User', userRole: req.user?.role || 'user', ...variables });
    }

    const result = await aiGateway.complete({
      task: 'chat',
      messages: [...chatHistory, { role: 'user', content: message }],
      systemPrompt,
      context: { endpoint: '/api/v1/ai/chat', conversationId },
    });

    if (result.blocked) {
      return res.status(422).json({ status: 'error', code: result.reason, message: result.content });
    }

    // Save to memory
    memoryStore.set({ scope: 'conversation', id: conversationId, entry: { role: 'user', content: message } });
    memoryStore.set({ scope: 'conversation', id: conversationId, entry: { role: 'assistant', content: result.content } });

    res.status(200).json({
      status: 'success',
      data: {
        reply: result.content,
        provider: result.provider,
        model: result.model,
        usage: result.usage,
        ...(ragContext && { citations: ragContext.citations, sources: ragContext.sources }),
      },
    });
  } catch (err) { next(err); }
};

// ─── Semantic Search (RAG) ────────────────────────────────────────────────────
exports.search = async (req, res, next) => {
  try {
    const { query, topK = 5, threshold = 0.60 } = req.body;
    if (!query) return res.status(400).json({ status: 'error', message: 'Query is required' });

    const results = await retriever.retrieve(query, { topK, scoreThreshold: threshold });
    res.status(200).json({ status: 'success', results: results.citations?.length || 0, data: results });
  } catch (err) { next(err); }
};

// ─── Document Ingestion ───────────────────────────────────────────────────────
exports.ingestDocument = async (req, res, next) => {
  try {
    const { id, title, content, source, metadata } = req.body;
    if (!id || !content) return res.status(400).json({ status: 'error', message: 'id and content are required' });
    const result = await pipeline.ingest({ id, title, content, source, metadata });
    res.status(201).json({ status: 'success', data: result });
  } catch (err) { next(err); }
};

// ─── Agent Execution ──────────────────────────────────────────────────────────
exports.runAgent = async (req, res, next) => {
  try {
    const { agentName, input, variables = {}, sessionId = 'default' } = req.body;
    if (!agentName || !input) return res.status(400).json({ status: 'error', message: 'agentName and input are required' });
    const result = await agentRegistry.execute(agentName, { input, variables, sessionId });
    res.status(200).json({ status: 'success', data: result });
  } catch (err) { next(err); }
};

// ─── Admin / Observability ────────────────────────────────────────────────────
exports.getGatewayStatus = async (req, res, next) => {
  try {
    const status = await aiGateway.getHealthStatus();
    res.status(200).json({ status: 'success', data: status });
  } catch (err) { next(err); }
};

exports.getCostReport = async (req, res, next) => {
  try {
    const summary = tokenTracker.getSummary();
    const recommendations = tokenTracker.getOptimizationRecommendations();
    res.status(200).json({ status: 'success', data: { summary, recommendations } });
  } catch (err) { next(err); }
};

exports.getAuditLog = async (req, res, next) => {
  try {
    const { type, limit } = req.query;
    const log = auditLogger.query({ type, limit: parseInt(limit || '50') });
    const compliance = auditLogger.getComplianceSummary();
    res.status(200).json({ status: 'success', data: { log, compliance } });
  } catch (err) { next(err); }
};

exports.getKnowledgeBase = async (req, res, next) => {
  try {
    res.status(200).json({ status: 'success', data: { documents: pipeline.listDocuments(), stats: pipeline.getStats() } });
  } catch (err) { next(err); }
};

exports.getAgentCatalog = async (req, res, next) => {
  try {
    res.status(200).json({ status: 'success', data: { agents: agentRegistry.getCatalog(), stats: agentRegistry.getStats() } });
  } catch (err) { next(err); }
};

exports.getPromptLibrary = async (req, res, next) => {
  try {
    res.status(200).json({ status: 'success', data: { prompts: promptService.list(), analytics: promptService.getAnalytics() } });
  } catch (err) { next(err); }
};
