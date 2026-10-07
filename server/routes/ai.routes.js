/**
 * Phase 121–129 — Enterprise AI Routes
 * Replaces basic 2-endpoint ai.routes.js with full enterprise AI API surface.
 */

const express = require('express');
const controller = require('../controllers/ai.controller');
const { protect: authenticate } = require('../middleware/auth.middleware');

const router = express.Router();

// ─── Core AI Chat (public with optional auth) ─────────────────────────────
router.post('/chat',         controller.chat);
router.post('/search',       controller.search);

// ─── RAG Knowledge Base (authenticated) ──────────────────────────────────
router.post('/documents',    authenticate, controller.ingestDocument);
router.get('/documents',     authenticate, controller.getKnowledgeBase);

// ─── Multi-Agent Platform (authenticated) ────────────────────────────────
router.post('/agents/run',   authenticate, controller.runAgent);
router.get('/agents',        authenticate, controller.getAgentCatalog);

// ─── Prompt Library (authenticated) ──────────────────────────────────────
router.get('/prompts',       authenticate, controller.getPromptLibrary);

// ─── Observability & Governance (admin) ──────────────────────────────────
router.get('/status',        authenticate, controller.getGatewayStatus);
router.get('/cost',          authenticate, controller.getCostReport);
router.get('/audit',         authenticate, controller.getAuditLog);

module.exports = router;
