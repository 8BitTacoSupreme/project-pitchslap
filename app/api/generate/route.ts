import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // 1. Get the user's input from the request body
  const { formType, formData } = await req.json();

  // 2. Check for the API key
  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json(
      { error: "API key not found. Please set GEMINI_API_KEY in .env.local" },
      { status: 500 }
    );
  }

  // 3. Initialize the Generative AI model (Gemini 1.5 Pro)
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

  // 4. Define the base role for the AI
  const role = "You are a world-class Story Editor and screenwriter. Your task is to take the user's story ideas and expand them into a compelling 3-act story structure outline. Be creative, insightful, and provide a clear, structured response.";

  // 5. Construct the specific user input based on the form type
  let userInput = `The user has provided the following details using the '${formType}' method:\n`;
  userInput += `Genre: ${formData.genre || 'Not specified'}.\n\n`;

  switch (formType) {
    case 'standard':
      userInput += `Title: ${formData.title || 'Not specified'}\n`;
      userInput += `Logline: ${formData.logline || 'Not specified'}\n`;
      userInput += `Summary: ${formData.summary || 'Not specified'}\n`;
      break;
    case 'prompted': // Pixar Method
      userInput += `Once upon a time...: ${formData.q1}\n`;
      userInput += `Until one day...: ${formData.q2}\n`;
      userInput += `And because of that... (1): ${formData.q3}\n`;
      userInput += `And because of that... (2): ${formData.q4}\n`;
      userInput += `And because of that... (3): ${formData.q5}\n`;
      userInput += `Until finally...: ${formData.q6}\n`;
      userInput += `And every day after that...: ${formData.q7}\n`;
      break;
    case 'advanced': // Vogler's Hero's Journey
      userInput += `The Ordinary World: ${formData.q1}\n`;
      userInput += `The Call to Adventure: ${formData.q2}\n`;
      userInput += `Refusal of the Call: ${formData.q3}\n`;
      userInput += `Meeting the Mentor: ${formData.q4}\n`;
      userInput += `Crossing the Threshold: ${formData.q5}\n`;
      userInput += `Tests, Allies, Enemies: ${formData.q6}\n`;
      userInput += `Approach to the Inmost Cave: ${formData.q7}\n`;
      userInput += `Supreme Ordeal: ${formData.q8}\n`;
      userInput += `Reward (Sizing the Sword): ${formData.q9}\n`;
      userInput += `The Road Back: ${formData.q10}\n`;
      userInput += `Resurrection: ${formData.q11}\n`;
      userInput += `Return With the Elixir: ${formData.q12}\n`;
      break;
    case 'random':
      userInput += `Based on the specified genre, please generate a fresh, compelling and marketable movie idea. Provide a unique Title, a captivating Logline, and a detailed Synopsis (3-5 paragraphs). Make it sound exciting!`;
      break;
    default:
        return NextResponse.json({ error: "Invalid form type" }, { status: 400 });
  }

  const prompt = `${role}\n\n--- USER INPUT ---\n${userInput}\n\n--- INSTRUCTIONS ---\nGenerate a complete story outline based on the user's input. Structure your response clearly with headings for Title, Logline, Characters, and a 3-Act Structure (Act I, Act II, Act III) with key plot points.`;
  
  try {
    // 6. Call the Gemini API and get the result
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // 7. Send the result back to the user's browser
    return NextResponse.json({ outline: text });

  } catch (error: any) {
    console.error("Error calling Gemini API:", error);
    return NextResponse.json(
      { error: "Failed to generate outline from AI. " + error.message },
      { status: 500 }
    );
  }
}
