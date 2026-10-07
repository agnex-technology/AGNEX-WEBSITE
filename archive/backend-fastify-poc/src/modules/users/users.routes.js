import { usersController } from './users.controller.js';
import { registerSchema, loginSchema } from './users.schema.js';

export default async function userRoutes(fastify, options) {
  fastify.post('/register', {
    schema: {
      body: registerSchema
    }
  }, usersController.register);

  fastify.post('/login', {
    schema: {
      body: loginSchema
    }
  }, usersController.login);

  fastify.get('/me', {
    preValidation: [fastify.authenticate]
  }, usersController.me);
}
