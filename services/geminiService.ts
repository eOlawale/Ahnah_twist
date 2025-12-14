import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const analyzeBodyImage = async (base64Image: string): Promise<string> => {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64Image
            }
          },
          {
            text: `Analyze this image for fashion sizing purposes. 
            1. Identify the likely body shape (e.g., Hourglass, Pear, Rectangle, Inverted Triangle, Apple).
            2. Suggest flattering clothing cuts and styles for this body type.
            3. Provide estimated relative proportions (e.g., "shoulders appear wider than hips").
            4. Do NOT guess specific measurements in cm/inches as scale is unknown, but advise on how to measure the key areas shown.
            Keep the tone professional, encouraging, and focused on fashion design.`
          }
        ]
      }
    });
    return response.text || "Could not analyze the image. Please try again.";
  } catch (error) {
    console.error("Error analyzing body image:", error);
    throw error;
  }
};

export const generateFashionDesign = async (prompt: string): Promise<string> => {
  try {
    // Using gemini-2.5-flash-image for image generation as per guidelines
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: `Fashion design sketch: ${prompt}. High quality, detailed fashion illustration, clean lines, professional presentation.` }]
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image generated");
  } catch (error) {
    console.error("Error generating design:", error);
    throw error;
  }
};

export const getFashionAdvice = async (query: string): Promise<string> => {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are an expert fashion consultant and tailoring instructor. Answer the following question: ${query}`
    });
    return response.text || "I couldn't generate advice at this moment.";
  } catch (error) {
    console.error("Error getting advice:", error);
    throw error;
  }
};

export const getFitSupport = async (query: string): Promise<string> => {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are 'Ahnah', an expert fit specialist and digital tailor for the Ahnah_twistz platform. 
      Your goal is to help users take accurate measurements, understand fit issues, and select the right size.
      Be concise, professional, and helpful. 
      User Query: ${query}`
    });
    return response.text || "I can help with fitting questions.";
  } catch (error) {
    console.error("Error getting fit support:", error);
    throw error;
  }
};

export const generateSocialCaption = async (description: string): Promise<string> => {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write a catchy, engaging social media caption (for Instagram/Pinterest) for a fashion design described as: "${description}". Include relevant hashtags.`
    });
    return response.text || "Check out my new design! #Fashion #Design";
  } catch (error) {
    console.error("Error generating caption:", error);
    return "Check out my new design! #Fashion #Design";
  }
};