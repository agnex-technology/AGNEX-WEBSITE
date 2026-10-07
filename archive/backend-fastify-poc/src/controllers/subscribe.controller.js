import { db } from '../db/index.js';
import { subscribers } from '../db/schema.js';
import { z } from 'zod';

const subscribeSchema = z.object({
  email: z.string().email(),
  tier: z.enum(['developer', 'enterprise']).default('developer'),
});

export const addSubscriber = async (request, reply) => {
  try {
    const { email, tier } = subscribeSchema.parse(request.body);

    await db.insert(subscribers).values({ email, tier }).onConflictDoNothing();

    return reply.send({
      message: 'Subscribed successfully',
      status: 'success'
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.code(400).send({ error: 'Bad Request', message: error.errors });
    }
    throw error;
  }
};
