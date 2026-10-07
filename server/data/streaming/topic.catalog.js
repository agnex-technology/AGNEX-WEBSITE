/**
 * Phase 132 — Enterprise Event Streaming Platform
 * Topic Catalog — defines all business event topics and their schemas.
 * 
 * This is the Schema Registry for the AGNEX event streaming platform.
 * Each topic has: name, description, schema, retention, partitions, consumers.
 */

const TOPICS = {
  // ── Authentication ──────────────────────────────────────────────────────
  'auth.user.registered': {
    description: 'Fired when a new user completes registration',
    schemaVersion: 1,
    retention: '7d',
    partitions: 3,
    schema: { userId: 'UUID', email: 'string', role: 'string', timestamp: 'ISO8601' },
    consumers: ['notification-service', 'analytics-service', 'onboarding-service'],
  },
  'auth.user.logged_in': {
    description: 'Fired on every successful login',
    schemaVersion: 1,
    retention: '3d',
    partitions: 6,
    schema: { userId: 'UUID', ipAddress: 'string', userAgent: 'string', timestamp: 'ISO8601' },
    consumers: ['analytics-service', 'audit-service'],
  },

  // ── HRMS / Recruitment ──────────────────────────────────────────────────
  'hrms.job.created': {
    description: 'Fired when a new job opening is published',
    schemaVersion: 1,
    retention: '30d',
    partitions: 3,
    schema: { jobId: 'UUID', title: 'string', department: 'string', createdBy: 'UUID' },
    consumers: ['search-index-service', 'notification-service', 'analytics-service'],
  },
  'hrms.application.submitted': {
    description: 'Fired when a candidate submits a job application',
    schemaVersion: 1,
    retention: '90d',
    partitions: 6,
    schema: { applicationId: 'UUID', jobId: 'UUID', candidateId: 'UUID', resumeUrl: 'string' },
    consumers: ['recruitment-agent', 'notification-service', 'analytics-service'],
  },
  'hrms.candidate.status_changed': {
    description: 'Fired when an application status changes',
    schemaVersion: 1,
    retention: '90d',
    partitions: 3,
    schema: { applicationId: 'UUID', previousStatus: 'string', newStatus: 'string', changedBy: 'UUID' },
    consumers: ['notification-service', 'analytics-service'],
  },

  // ── CRM ─────────────────────────────────────────────────────────────────
  'crm.lead.created': {
    description: 'Fired when a new CRM lead is created',
    schemaVersion: 1,
    retention: '30d',
    partitions: 3,
    schema: { leadId: 'UUID', organizationId: 'UUID', status: 'string', budget: 'number' },
    consumers: ['crm-agent', 'analytics-service'],
  },
  'crm.lead.converted': {
    description: 'Fired when a lead converts to a project',
    schemaVersion: 1,
    retention: '365d',
    partitions: 3,
    schema: { leadId: 'UUID', projectId: 'UUID', dealValue: 'number', convertedBy: 'UUID' },
    consumers: ['analytics-service', 'finance-service'],
  },

  // ── AI Platform ─────────────────────────────────────────────────────────
  'ai.conversation.started': {
    description: 'Fired when an AI chat session begins',
    schemaVersion: 1,
    retention: '7d',
    partitions: 6,
    schema: { sessionId: 'string', userId: 'UUID', model: 'string', task: 'string' },
    consumers: ['analytics-service', 'cost-tracking-service'],
  },
  'ai.inference.completed': {
    description: 'Fired after every AI inference call',
    schemaVersion: 1,
    retention: '30d',
    partitions: 6,
    schema: { sessionId: 'string', provider: 'string', model: 'string', tokens: 'object', latencyMs: 'number', costUSD: 'number' },
    consumers: ['cost-tracking-service', 'analytics-service'],
  },
  'ai.safety.blocked': {
    description: 'Fired when a request is blocked by governance',
    schemaVersion: 1,
    retention: '365d',
    partitions: 3,
    schema: { sessionId: 'string', reason: 'string', userId: 'UUID', messageSnippet: 'string' },
    consumers: ['audit-service', 'security-service'],
  },

  // ── Notifications ────────────────────────────────────────────────────────
  'notification.created': {
    description: 'Fired when a notification is queued for delivery',
    schemaVersion: 1,
    retention: '7d',
    partitions: 6,
    schema: { notificationId: 'UUID', userId: 'UUID', type: 'string', channel: 'string' },
    consumers: ['email-service', 'push-service', 'sms-service'],
  },

  // ── Audit ────────────────────────────────────────────────────────────────
  'audit.event.created': {
    description: 'Fired for every platform audit event',
    schemaVersion: 1,
    retention: '2555d', // 7 years for compliance
    partitions: 12,
    schema: { userId: 'UUID', action: 'string', entityType: 'string', entityId: 'UUID', metadata: 'object' },
    consumers: ['audit-service', 'compliance-service', 'siem'],
  },

  // ── Platform ─────────────────────────────────────────────────────────────
  'platform.payment.completed': {
    description: 'Fired when a payment is successfully processed',
    schemaVersion: 1,
    retention: '2555d',
    partitions: 6,
    schema: { paymentId: 'UUID', userId: 'UUID', amount: 'number', currency: 'string', provider: 'string' },
    consumers: ['finance-service', 'notification-service', 'analytics-service'],
  },
};

module.exports = TOPICS;
