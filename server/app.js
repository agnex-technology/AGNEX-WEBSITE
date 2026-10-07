const crypto = require('crypto');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis').default;
const { Redis } = require('ioredis');
const errorHandler = require('./middleware/error.middleware');
const config = require('./core/config');

const app = express();

// Request Correlation ID Middleware (Observability)
app.use((req, res, next) => {
    const correlationId = req.headers['x-request-id'] || req.headers['x-correlation-id'] || crypto.randomUUID();
    req.correlationId = correlationId;
    res.setHeader('X-Request-Id', correlationId);
    next();
});

// Security Middleware (Prompt 17/11, Phase 10)
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "https://trusted-cdn.com", "https://static.cloudflareinsights.com"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            imgSrc: ["'self'", "data:", "https:", "https://images.agnex.tech"],
            connectSrc: ["'self'", "https://api.supabase.com", "https://generativelanguage.googleapis.com"],
            frameAncestors: ["'none'"],
            objectSrc: ["'none'"],
        },
    },
    frameguard: {
        action: 'deny'
    },
    hsts: {
        maxAge: 31536000,
        includeSubDomains: true
    },
    crossOriginEmbedderPolicy: false,
}));

const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (config.cors.origins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};
app.use(cors(corsOptions));

// Rate Limiting (High Availability - Prompt 37)
let limiterStore;
if (config.redis.enabled) {
    const client = new Redis(config.redis.uri);
    limiterStore = new RedisStore({
        sendCommand: (...args) => client.call(...args),
    });
}

const limiter = rateLimit({
    windowMs: config.rateLimit.windowMs,
    max: config.rateLimit.max,
    store: limiterStore,
    message: { status: 'error', message: 'Too many requests, please try again later.' }
});
app.use('/api', limiter);

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Logging Middleware (Prompt 19/11)
app.use(morgan('combined'));

// === Phase 111/112 — Kubernetes Health Probes ===
// Liveness: is the process alive? (k8s restarts pod if this fails)
app.get('/health/live', (req, res) => {
    res.status(200).json({ status: 'alive', timestamp: new Date().toISOString() });
});

// Readiness: is the app ready to serve traffic? (k8s removes from LB if this fails)
app.get('/health/ready', (req, res) => {
    if (req.app.locals.isReady) {
        res.status(200).json({ status: 'ready', timestamp: new Date().toISOString() });
    } else {
        res.status(503).json({ status: 'not-ready', timestamp: new Date().toISOString() });
    }
});

// Startup probe: used during container initialisation
app.get('/health/startup', (req, res) => {
    res.status(200).json({ status: 'started', timestamp: new Date().toISOString() });
});

// Deep status: aggregate health check for observability dashboards
app.get('/health/status', (req, res) => {
    res.status(200).json({
        status: 'healthy',
        environment: process.env.NODE_ENV || 'development',
        version: process.env.APP_VERSION || '1.0.0',
        uptime: process.uptime(),
        memoryMB: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        timestamp: new Date().toISOString(),
    });
});

// Legacy health (backward compatible)
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'success', message: 'API is healthy' });
});
app.get('/api/v1/health', (req, res) => {
    res.status(200).json({ status: 'success', message: 'API is healthy' });
});

// API Status
app.get('/status', (req, res) => {
    res.status(200).json({
        status: 'success',
        environment: process.env.NODE_ENV || 'development',
        version: process.env.APP_VERSION || '1.0.0',
    });
});

// V1 Routes Placeholder
app.use('/api/v1/auth', require('./routes/auth.routes'));
app.use('/api/v1/crm', require('./routes/crm.routes'));
app.use('/api/v1/hrms', require('./routes/hrms.routes'));
app.use('/api/v1/services', require('./routes/service.routes'));
app.use('/api/v1/ai', require('./routes/ai.routes'));
app.use('/api/v1/consultation', require('./routes/consultation.routes'));
app.use('/api/consultation', require('./routes/consultation.routes'));

// Global 404 Handler
app.use((req, res, next) => {
    res.status(404).json({ status: 'error', message: `Can't find ${req.originalUrl} on this server!` });
});

// Global Error Handler (Observability)
app.use(errorHandler);

module.exports = app;
