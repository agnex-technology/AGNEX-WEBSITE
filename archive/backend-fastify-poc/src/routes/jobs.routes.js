import * as jobsController from '../controllers/jobs.controller.js';

export default async function jobsRoutes(fastify, options) {
  fastify.get('/', jobsController.getJobs);
}
