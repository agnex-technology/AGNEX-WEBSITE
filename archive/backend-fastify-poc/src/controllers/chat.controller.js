import { z } from 'zod';
import { env } from '../config/env.js';
import { GoogleGenerativeAI } from '@google/generative-ai';

const chatSchema = z.object({
  query: z.string().min(1),
});

export const handleChat = async (request, reply) => {
  try {
    const { query } = chatSchema.parse(request.body);

    if (env.MOCK_AI) {
      // Simulate AI processing delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      return reply.send({
        response: `[MOCK AI] This is a simulated response to: "${query}". In production, this will connect to a real LLM.`,
        status: 'success'
      });
    }

    if (!env.GEMINI_API_KEY) {
      return reply.code(500).send({ error: 'Internal Server Error', message: 'Gemini API key is not configured.' });
    }

    const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    // Create a context prompt to make the AI act as an assistant for AGNEX Technology
    const systemInstruction = `You are a helpful, professional, and friendly virtual assistant for AGNEX Technology, an enterprise tech company. Keep your answers concise and highly relevant to the user's query.`;
    
    const result = await model.generateContent([
      systemInstruction,
      `User: ${query}`
    ]);
    
    const responseText = result.response.text();

    return reply.send({
      response: responseText,
      status: 'success'
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.code(400).send({ error: 'Bad Request', message: error.errors });
    }
    throw error;
  }
};
