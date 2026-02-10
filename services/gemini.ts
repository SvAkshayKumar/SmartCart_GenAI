
import { GoogleGenAI, Type } from "@google/genai";

const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
};

export const generateProductDescription = async (productName: string, category: string) => {
  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Write a catchy, professional, and SEO-friendly product description for a ${productName} in the ${category} category for a tech gadgets store. Keep it under 100 words.`,
    });
    return response.text || "Could not generate description at this time.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "AI generation failed. Please try again later.";
  }
};

export const askAIAboutProduct = async (productDetails: any, question: string) => {
  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are an expert sales assistant for SmartCart TechGadgets Store. Answer the following question about this product: ${JSON.stringify(productDetails)}. Question: ${question}`,
    });
    return response.text || "I'm sorry, I couldn't process that question.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The AI assistant is currently offline.";
  }
};

export const getAIRecommendations = async (allProducts: any[]) => {
  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Based on these products: ${JSON.stringify(allProducts.map(p => ({id: p.id, name: p.name, category: p.category})))}. Pick the top 3 tech gadgets people would love right now. Return your response as JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.INTEGER },
              reason: { type: Type.STRING, description: "Why this is a top pick" }
            },
            required: ["id", "reason"]
          }
        }
      }
    });
    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Gemini Error:", error);
    return [];
  }
};

export const getBusinessInsights = async (allProducts: any[]) => {
  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are a business consultant. Review this store inventory: ${JSON.stringify(allProducts)}. Provide 3 strategic insights for the store owner to increase sales. Keep it brief.`,
    });
    return response.text || "No insights available.";
  } catch (error) {
    return "AI consultant unavailable.";
  }
};
