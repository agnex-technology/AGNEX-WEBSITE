import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import { env } from './config/env.js';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';

import userRoutes from './modules/users/users.routes.js';
import { authMiddleware } from './middlewares/auth.middleware.js';

import rateLimit from '@fastify/rate-limit';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { jsonSchemaTransform } from 'fastify-type-provider-zod';

const buildApp = async () => {
  const app = Fastify({
    logger: {
      transport: {
        target: 'pino-pretty',
      },
    },
  });

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  await app.register(swagger, {
    openapi: {
      info: {
        title: 'AGNEX Technology API',
        description: 'AGNEX Enterprise Backend API',
        version: '1.0.0',
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
    },
    transform: jsonSchemaTransform,
  });

  await app.register(swaggerUi, {
    routePrefix: '/docs',
  });

  // Middleware
  await app.register(helmet);
  await app.register(cors, {
    origin: env.FRONTEND_URL,
    credentials: true,
  });
  
  // Free-Tier Upstash/Memory Rate Limiter
  await app.register(rateLimit, {
    max: 100,
    timeWindow: '1 minute'
  });

  await app.register(authMiddleware);

  // Health check
  app.get('/health', async () => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  });

  // Register API Routes
  app.register(userRoutes, { prefix: '/api/v1/users' });

  // Global Error Handler
  app.setErrorHandler((error, request, reply) => {
    app.log.error(error);
    reply.status(error.statusCode || 500).send({
      error: 'Internal Server Error',
      message: error.message || 'Something went wrong',
    });
  });

  return app;
};

const start = async () => {
  try {
    const app = await buildApp();
    await app.listen({ port: env.PORT, host: '0.0.0.0' });
    app.log.info(`Server is running on port ${env.PORT}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
