
import { GoogleGenAI } from "@google/genai";

export const geminiService = {
  generateBio: async (name: string, keywords: string): Promise<string> => {
    try {
      // Always create a new GoogleGenAI instance right before making an API call
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Create a professional and high-end one-paragraph bio for a club member named ${name}. Keywords to include: ${keywords}. Make it sound sophisticated.`,
      });
      return response.text || "No bio generated.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Failed to generate bio. Please write manually.";
    }
  },
  suggestNotice: async (topic: string): Promise<string> => {
    try {
      // Always create a new GoogleGenAI instance right before making an API call
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Write a short, professional club announcement about: ${topic}. Include a clear heading and details.`,
      });
      return response.text || "No content generated.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Failed to suggest content.";
    }
  }
};
