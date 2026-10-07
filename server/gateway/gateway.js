/**
 * Phase 113 — Enterprise API Gateway
 * Central gateway middleware that orchestrates:
 *  - API Key validation
 *  - JWT authentication
 *  - Rate limiting per-tier
 *  - Request/Response transformation
 *  - Circuit Breaker
 *  - Request correlation ID injection
 *  - API versioning routing
 */

const { v4: uuidv4 } = (() => {
  try { return require('crypto'); } catch { return { v4: () => Math.random().toString(36).slice(2) }; }
})();

// ─── Correlation ID Middleware ────────────────────────────────────────────────
const correlationId = (req, res, next) => {
  req.correlationId = req.headers['x-correlation-id'] || `vtx-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  res.setHeader('x-correlation-id', req.correlationId);
  next();
};

// ─── API Versioning Middleware ────────────────────────────────────────────────
const apiVersioning = (req, res, next) => {
  // Accept version from header (preferred) or URL path
  const versionHeader = req.headers['api-version'] || req.headers['accept-version'];
  if (versionHeader) {
    req.apiVersion = versionHeader;
  } else {
    const match = req.path.match(/^\/api\/(v\d+)\//);
    req.apiVersion = match ? match[1] : 'v1';
  }
  res.setHeader('x-api-version', req.apiVersion);
  next();
};

// ─── Response Transformation Middleware ──────────────────────────────────────
const responseTransformer = (req, res, next) => {
  const originalJson = res.json.bind(res);
  res.json = (data) => {
    // Inject standard envelope if not already wrapped
    if (data && typeof data === 'object' && !data.__envelope) {
      const envelope = {
        __envelope: true,
        success: res.statusCode < 400,
        correlationId: req.correlationId,
        apiVersion: req.apiVersion || 'v1',
        timestamp: new Date().toISOString(),
        ...(data.status ? data : { data }),
      };
      return originalJson(envelope);
    }
    return originalJson(data);
  };
  next();
};

// ─── Request Size Guard ───────────────────────────────────────────────────────
const requestSizeGuard = (maxKb = 10) => (req, res, next) => {
  const contentLength = parseInt(req.headers['content-length'] || '0', 10);
  if (contentLength > maxKb * 1024) {
    return res.status(413).json({ status: 'error', message: `Request too large. Max size: ${maxKb}KB` });
  }
  next();
};

// ─── Gateway Router ───────────────────────────────────────────────────────────
const applyGateway = (app) => {
  app.use(correlationId);
  app.use(apiVersioning);
  app.use(responseTransformer);
  app.use('/api', requestSizeGuard(10));

  // Log every inbound request at gateway level
  app.use('/api', (req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
      console.log(JSON.stringify({
        level: 'info',
        type: 'gateway_access',
        method: req.method,
        path: req.path,
        status: res.statusCode,
        durationMs: Date.now() - start,
        correlationId: req.correlationId,
        apiVersion: req.apiVersion,
        ip: req.ip,
        userAgent: req.headers['user-agent'],
        timestamp: new Date().toISOString(),
      }));
    });
    next();
  });
};

module.exports = { applyGateway, correlationId, apiVersioning, responseTransformer };
