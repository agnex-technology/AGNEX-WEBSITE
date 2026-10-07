import * as chatController from '../controllers/chat.controller.js';

export default async function chatRoutes(fastify, options) {
  fastify.post('/chat', chatController.handleChat);
}
