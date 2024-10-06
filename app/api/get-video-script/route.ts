import { chatSession } from "@/configs/AiModal";
import { NextResponse } from "next/server";

export interface PromptReqBody {
  prompt: string;
}

export async function POST(req: { json: () => PromiseLike<PromptReqBody> }) {
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
