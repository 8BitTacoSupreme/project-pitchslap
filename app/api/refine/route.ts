// In app/api/refine/route.ts

import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { previousOutline, refinementPrompt } = await req.json();

  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json(
      { error: "API key not found." },
      { status: 500 }
    );
  }
  if (!previousOutline || !refinementPrompt) {
      return NextResponse.json({ error: "Missing previous outline or refinement prompt" }, { status: 400 });
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  // We can continue using the fast and cheap flash model for this
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

  const prompt = `
    You are a world-class Story Editor. Your task is to revise and enhance an existing story outline based on the user's notes.
    Do not start from scratch. Modify the provided outline to incorporate the following changes, then return the complete, new version of the outline.

    --- EXISTING OUTLINE ---
    ${previousOutline}

    --- USER'S REFINEMENT NOTES ---
    ${refinementPrompt}

    --- INSTRUCTIONS ---
    Please provide the new, complete, and revised story outline that incorporates the user's notes.
    Maintain the 3-act structure and ensure the story remains coherent. Output only the revised outline.
    `;
  
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ newOutline: text });

  } catch (error: any) {
    console.error("Error calling Gemini API for refinement:", error);
    return NextResponse.json(
      { error: "Failed to refine outline. " + error.message },
      { status: 500 }
    );
  }
}
