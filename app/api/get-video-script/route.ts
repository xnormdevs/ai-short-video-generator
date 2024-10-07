import { chatSession } from "@/configs/AiModal";
import { NextResponse, NextRequest } from "next/server";

export interface PromptReqBody {
  prompt: string;
}

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    console.log(prompt);
    const result = await chatSession.sendMessage(prompt);
    console.log(result.response.text());
    return NextResponse.json({ result: JSON.parse(result.response.text()) });
  } catch (error) {
    return NextResponse.json({ 'Error': error });
  }
}
