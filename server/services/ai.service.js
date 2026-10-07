const { GoogleGenerativeAI } = require('@google/generative-ai');

/**
 * Enterprise AI Service
 * Powered by Gemini 2.5 Flash for RAG Chatbot and Knowledge Base.
 */

// Initialize Gemini API (Requires GEMINI_API_KEY in .env)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'mock-key');

class AIService {
    /**
     * Generate a chatbot response using the RAG knowledge base.
     * @param {string} userQuery - The user's input
     * @param {Array} history - Previous chat context
     */
    static async generateChatResponse(userQuery, history = []) {
        try {
            console.log(`[AIService] Querying Gemini: ${userQuery}`);
            
            // In a real RAG system, we would first do a vector search here
            // const context = await VectorSearch.findRelevantDocs(userQuery);

            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
            
            // System prompt defining the AI's persona
            const systemInstruction = "You are the AGNEX Technology AI Assistant. You are professional, concise, and helpful. Only answer questions related to AGNEX Technology software, IT services, and enterprise solutions.";
            
            // Format history for Gemini SDK if needed
            // For simplicity, we just pass the prompt for now
            const prompt = `${systemInstruction}\n\nUser: ${userQuery}\nAI:`;

            // If we don't have a real API key, return a mock response
            if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'mock-key') {
                return "I am the AGNEX AI Assistant. (Mock Mode: Please configure GEMINI_API_KEY in the server environment).";
            }

            const result = await model.generateContent(prompt);
            const response = await result.response;
            return response.text();
            
        } catch (error) {
            console.error(`[AIService] Error generating response:`, error);
            throw new Error('AI Service is temporarily unavailable.');
        }
    }

    /**
     * Generate embeddings for semantic search
     * @param {string} text - The content to embed
     */
    static async generateEmbeddings(text) {
        try {
            // Placeholder for text-embedding-004 model
            const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
            
            if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'mock-key') {
                return [0.1, 0.2, 0.3]; // Mock vector
            }

            const result = await model.embedContent(text);
            return result.embedding.values;
        } catch (error) {
            console.error(`[AIService] Embedding error:`, error);
            throw new Error('Failed to generate embeddings.');
        }
    }
}

module.exports = AIService;
