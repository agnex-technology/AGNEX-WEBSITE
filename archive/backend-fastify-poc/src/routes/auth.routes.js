import * as authController from '../controllers/auth.controller.js';

export default async function authRoutes(fastify, options) {
  fastify.post('/login', authController.login);
}
