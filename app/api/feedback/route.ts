import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const personaPrompts: Record<string, string> = {
  producer: "You are a cynical but brilliant Hollywood producer with a strong commercial sense. You are looking for freshness, market viability, and attractiveness to marquee actors. Your feedback should be blunt, direct, and focused on the business side of filmmaking. Point out potential budget issues, audience appeal (or lack thereof), and whether the concept feels like a 'tentpole' film.",
  market_analyst: "You are a data-driven market analyst at a major studio. Your focus is on financial viability. Analyze the concept based on its genre, potential target audience, comparable films ('comps'), and box office potential (both foreign and domestic). Consider its streaming potential and overall franchise viability. Use data-oriented language.",
  reader: "You are an experienced studio script reader. You care most about the story's structure, character arcs, and dialogue. Your main job is to identify if this is 'enough like' existing successful films to be familiar, but 'not too much like' them to be derivative. If it takes tropes and makes novel use of them (e.g., 'Die Hard on a Bus'), that's great. If it is just a lazy copy, that's bad. Your feedback should be constructive and focused on improving the script's core narrative."
};

export async function POST(req: NextRequest) {
  const { outline, personas } = await req.json();

  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json({ error: "API key not found." }, { status: 500 });
  }
  if (!outline || !personas || !Array.isArray(personas) || personas.length === 0) {
      return NextResponse.json({ error: "Missing outline or personas" }, { status: 400 });
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

  const feedbackResults: Record<string, string> = {};

  try {
    for (const persona of personas) {
      const role = personaPrompts[persona];
      if (!role) {
        feedbackResults[persona] = "Invalid persona selected.";
        continue;
      }

      const prompt = `${role}\n\n--- STORY OUTLINE ---\n${outline}\n\n--- YOUR TASK ---\nProvide your expert feedback on the story outline above based on your specific role. Be concise, insightful, and stay in character.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      feedbackResults[persona] = response.text();
    }
    
    return NextResponse.json({ feedback: feedbackResults });

  } catch (error: any) {
    console.error("Error getting feedback from Gemini API:", error);
    return NextResponse.json(
      { error: "Failed to get feedback. " + error.message },
      { status: 500 }
    );
  }
}
