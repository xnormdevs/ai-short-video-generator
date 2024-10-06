import { AssemblyAI } from "assemblyai";
import { NextResponse } from "next/server";
export interface CaptionGenerateBody {
  audioFileUrl: string;
}
export async function POST(req: {
  json: () => PromiseLike<CaptionGenerateBody>;
}) {
  try {
    const { audioFileUrl } = await req.json();

    const client = new AssemblyAI({
      apiKey: process.env.ASSEMBLYAI_API_KEY as string,
    });

    const audioUrl = audioFileUrl;

    const config = {
      audio_url: audioUrl,
    };

    const transcript = await client.transcripts.transcribe(config);
    console.log(transcript.text, transcript.words);
    return NextResponse.json({ result: transcript.words });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ Error: err });
  }
}
