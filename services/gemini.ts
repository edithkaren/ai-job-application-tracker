
import { GoogleGenAI, Type } from "@google/genai";
import { AIAnalysisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function analyzeResume(resumeText: string, jobDescription: string): Promise<AIAnalysisResult> {
  const prompt = `
    Critically analyze this resume against the job description below. 
    
    1. Score the match from 0-100.
    2. Identify specific missing skills.
    3. IMPORTANT: Provide specific, actionable "Before vs. After" style resume improvement examples. 
       Reference exact requirements from the job description and show how the user can reword their 
       existing experience to better demonstrate those skills.
    
    Resume: ${resumeText}
    Job Description: ${jobDescription}
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            matchingPoints: { type: Type.ARRAY, items: { type: Type.STRING } },
            missingSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
            improvements: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "Actionable 'How to improve' tips with specific phrasing examples."
            }
          },
          required: ["score", "matchingPoints", "missingSkills", "improvements"],
        },
      },
    });

    return JSON.parse(response.text) as AIAnalysisResult;
  } catch (error) {
    console.error("AI Analysis failed:", error);
    return {
      score: 0,
      matchingPoints: ["Error"],
      missingSkills: ["Analysis failed"],
      improvements: ["Please try again with a clearer resume text."]
    };
  }
}
