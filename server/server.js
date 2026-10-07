require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 5000;
const SHUTDOWN_TIMEOUT_MS = parseInt(process.env.SHUTDOWN_TIMEOUT_MS || '10000', 10);

// Phase 111 — Cloud Native: Readiness state flag
let isReady = false;
app.locals.isReady = false;

const server = app.listen(PORT, () => {
    console.log(JSON.stringify({
        level: 'info',
        message: `Enterprise API Server listening`,
        port: PORT,
        env: process.env.NODE_ENV || 'development',
        timestamp: new Date().toISOString(),
    }));
    // Signal readiness after server binds
    isReady = true;
    app.locals.isReady = true;
});

// Phase 111 — Graceful Shutdown (Kubernetes SIGTERM / SIGINT support)
const shutdown = (signal) => {
    console.log(JSON.stringify({ level: 'warn', message: `${signal} received — initiating graceful shutdown`, timestamp: new Date().toISOString() }));

    // Mark as not-ready so k8s readiness probe fails and traffic drains
    isReady = false;
    app.locals.isReady = false;

    const forceExit = setTimeout(() => {
        console.error(JSON.stringify({ level: 'error', message: 'Forced shutdown after timeout', timestamp: new Date().toISOString() }));
        process.exit(1);
    }, SHUTDOWN_TIMEOUT_MS);
    forceExit.unref();

    server.close((err) => {
        if (err) {
            console.error(JSON.stringify({ level: 'error', message: 'Error during shutdown', error: err.message }));
            process.exit(1);
        }
        console.log(JSON.stringify({ level: 'info', message: 'Server closed cleanly', timestamp: new Date().toISOString() }));
        process.exit(0);
    });
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT',  () => shutdown('SIGINT'));

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error(JSON.stringify({ level: 'error', message: 'Unhandled Promise Rejection', reason: String(reason), timestamp: new Date().toISOString() }));
    shutdown('unhandledRejection');
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error(JSON.stringify({ level: 'error', message: 'Uncaught Exception', error: err.message, stack: err.stack, timestamp: new Date().toISOString() }));
    shutdown('uncaughtException');
});

module.exports = { server, isReady };
