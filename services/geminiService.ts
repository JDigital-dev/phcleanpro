import { GoogleGenAI } from "@google/genai";

export const getAIResponse = async (userQuery: string): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      return "I'm sorry, I cannot connect to the AI service right now. Please verify the API Key.";
    }

    const ai = new GoogleGenAI({ apiKey });
    const model = 'gemini-2.5-flash';

    const systemInstruction = `
      You are "Chioma", the virtual assistant for PH Cleaning Pro, a premium cleaning service in Port Harcourt, Nigeria.
      Your tone is professional, warm, and helpful. 
      Currency is Naira (₦).
      
      Services:
      - Standard Cleaning: ₦15,000 (Maintenance)
      - Deep Cleaning: ₦35,000 (Thorough)
      - Move-in/out: ₦45,000 (Empty home)
      
      Neighborhoods: GRA, Trans Amadi, Woji, Peter Odili.
      
      Answer questions about pricing, what's included, and convince them to book.
      Keep answers short (under 50 words).
    `;

    const response = await ai.models.generateContent({
      model,
      contents: userQuery,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text || "I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting right now. Please call us directly.";
  }
};