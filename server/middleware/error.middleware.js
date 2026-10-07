/**
 * Global Error Handling Middleware
 * Centralized error management for the Enterprise Platform.
 */

const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    // Log the error using structured logging (Observability)
    console.error(`[ERROR] [TraceID: ${req.headers['x-trace-id'] || 'N/A'}] ${err.message}`, {
        path: req.originalUrl,
        method: req.method,
        ip: req.ip,
        stack: err.stack,
    });

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        // In production, we don't leak stack traces
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};

module.exports = errorHandler;
