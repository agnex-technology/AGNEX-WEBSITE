import * as subscribeController from '../controllers/subscribe.controller.js';

export default async function subscribeRoutes(fastify, options) {
  fastify.post('/', subscribeController.addSubscriber);
}
