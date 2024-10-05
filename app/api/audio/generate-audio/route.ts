import textToSpeech from "@google-cloud/text-to-speech";
import { NextResponse } from "next/server";
const fs = require("fs");
const util = require("util");
export interface AudioReqBody {
  text: string;
  id: string;
}

const client = new textToSpeech.TextToSpeechClient({
  apiKey: process.env.GOOLE_API_KEY,
});

export async function POST(req: { json: () => PromiseLike<AudioReqBody> }) {
  const { text, id } = await req.json();
  const request = {
    input: { text: text },
    // Select the language and SSML voice gender (optional)
    voice: { languageCode: "en-US", ssmlGender: "FEMALE" as const },
    // select the type of audio encoding
    audioConfig: { audioEncoding: 2 },
  };
  // Performs the text-to-speech request
  const [response] = await client.synthesizeSpeech(request);
  // Write the binary audio content to a local file
  const writeFile = util.promisify(fs.writeFile);
  await writeFile("output.mp3", response.audioContent, "binary");
  console.log("Audio content written to file: output.mp3");

  return NextResponse.json({ result: "success" });
}
