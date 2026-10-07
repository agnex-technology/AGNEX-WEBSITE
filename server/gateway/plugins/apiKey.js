/**
 * Phase 113 — API Gateway: API Key Management
 * Validates API keys passed in x-api-key header.
 * Supports tiered keys: free / pro / enterprise — each with different rate limits.
 */

// In production, authorized keys must be provisioned via environment or database
const isProd = process.env.NODE_ENV === 'production';
const API_KEY_STORE = new Map(
  isProd
    ? (process.env.API_KEYS_JSON ? Object.entries(JSON.parse(process.env.API_KEYS_JSON)) : [])
    : [
        ['vtx-free-demo-key-001',       { tier: 'free',       rateLimit: 50,   orgId: 'demo' }],
        ['vtx-pro-placeholder-key-002', { tier: 'pro',        rateLimit: 500,  orgId: 'placeholder' }],
        ['vtx-ent-placeholder-key-003', { tier: 'enterprise', rateLimit: 5000, orgId: 'placeholder' }],
      ]
);

/**
 * Middleware: validates x-api-key header for non-browser API access
 * Skips validation for browser-originated requests (session-based auth)
 */
const validateApiKey = (req, res, next) => {
  const key = req.headers['x-api-key'];

  // Skip for UI/browser clients — they use JWT (set by auth middleware)
  if (!key) return next();

  const keyData = API_KEY_STORE.get(key);
  if (!keyData) {
    return res.status(401).json({
      status: 'error',
      code: 'INVALID_API_KEY',
      message: 'Invalid or missing API key',
      correlationId: req.correlationId,
    });
  }

  // Attach key context to request for downstream rate-limiting/logging
  req.apiKey = { ...keyData, key };
  next();
};

module.exports = { validateApiKey };
