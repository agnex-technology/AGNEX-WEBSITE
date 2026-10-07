import { db } from '../db/index.js';
import { jobs } from '../db/schema.js';
import { eq } from 'drizzle-orm';

export const getJobs = async (request, reply) => {
  try {
    const activeJobs = await db.select().from(jobs).where(eq(jobs.isActive, true));
    return reply.send({ jobs: activeJobs });
  } catch (error) {
    throw error;
  }
};
