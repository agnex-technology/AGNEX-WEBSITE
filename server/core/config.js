require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '15m',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  },
  db: {
    uri: process.env.DATABASE_URL || 'postgres://localhost:5432/agnex',
  },
  redis: {
    enabled: !!process.env.REDIS_URL,
    uri: process.env.REDIS_URL,
  },
  kafka: {
    brokers: process.env.KAFKA_BROKERS ? process.env.KAFKA_BROKERS.split(',') : ['localhost:9092'],
  },
  cors: {
    origins: process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : ['http://localhost:3000', 'http://localhost:5173'],
  },
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10), // Default 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),
  },
  logLevel: process.env.LOG_LEVEL || 'info',
};

// Validate critical secrets in production
if (config.env === 'production') {
  if (!config.jwt.secret) {
    throw new Error('FATAL: JWT_SECRET environment variable is missing in production.');
  }
  if (!process.env.CORS_ORIGINS) {
    throw new Error('FATAL: CORS_ORIGINS environment variable is missing in production.');
  }
}

// In development, ensure we have a fallback JWT_SECRET so local work continues
if (config.env !== 'production' && !config.jwt.secret) {
  config.jwt.secret = 'development_fallback_secret_do_not_use_in_prod';
}

module.exports = config;
