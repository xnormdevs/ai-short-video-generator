import { storage } from "@/configs/FirebaseConfig";
import textToSpeech from "@google-cloud/text-to-speech";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
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
  const storageRef = ref(storage, `ai-short-video-files/${id}.mp3`);
  const request = {
    input: { text: text },
    // Select the language and SSML voice gender (optional)
    voice: { languageCode: "en-US", ssmlGender: "FEMALE" as const },
    // select the type of audio encoding
    audioConfig: { audioEncoding: 2 },
  };
  // Performs the text-to-speech request
  const [response] = await client.synthesizeSpeech(request);

  const audioBuffer = Buffer.from(response.audioContent as string, "binary");
  await uploadBytes(storageRef, audioBuffer, { contentType: "audio/mp3" });

  const downloadUrl = await getDownloadURL(storageRef);
  console.log(downloadUrl);

  return NextResponse.json({ result: downloadUrl });
}
