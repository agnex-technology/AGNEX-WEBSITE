import fp from 'fastify-plugin';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { usersRepo } from '../modules/users/users.repo.js';

export const authMiddleware = fp(async (fastify, opts) => {
  fastify.decorate('authenticate', async (request, reply) => {
    try {
      const authHeader = request.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return reply.code(401).send({ error: 'Unauthorized: Missing or invalid token' });
      }

      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, env.JWT_SECRET);

      // (Optional) DB Check to ensure user wasn't deleted / token wasn't revoked
      const user = await usersRepo.findById(decoded.id);
      if (!user) {
        return reply.code(401).send({ error: 'Unauthorized: User no longer exists' });
      }

      request.user = decoded;
    } catch (err) {
      reply.code(401).send({ error: 'Unauthorized: Token verification failed' });
    }
  });

  fastify.decorate('requireRole', (role) => {
    return async (request, reply) => {
      if (!request.user || request.user.role !== role) {
        return reply.code(403).send({ error: 'Forbidden: Insufficient permissions' });
      }
    };
  });
});
