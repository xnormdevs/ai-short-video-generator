import { storage } from "@/configs/FirebaseConfig";
import { convertImage } from "@/lib/helper";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { NextResponse } from "next/server";
import Replicate from "replicate";
export interface ImageGenerateBody {
  prompt: string;
}
export async function POST(req: {
  json: () => PromiseLike<ImageGenerateBody>;
}) {
  try {
    const { prompt } = await req.json();
    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_KEY,
    });
    const input = {
      prompt: prompt,
      height: 1280,
      width: 720,
      num_outputs: 1,
    };
    const output: any = await replicate.run(
      "bytedance/sdxl-lightning-4step:5599ed30703defd1d160a25a63321b4dec97101d98b4674bcc56e41f62f35637",
      { input }
    );
    console.log(output);

    // save to firebase
    const base64Image = "data:image/png;base64," + await convertImage(output[0]);
    const fileName = 'ai-short-video-files/' + Date.now() + '.png';
    const storageRef = ref(storage, fileName);
    await uploadString(storageRef, base64Image, 'data_url');
    const downloadUrl = await getDownloadURL(storageRef);
    console.log(downloadUrl);
    return NextResponse.json({ result: downloadUrl });
    // ['https://replicate.delivery/yhqm/MrwFSspLcJ7BPppvdYyuRR8ZmDBUmeJxRWhunbMfbPEbfCInA/out-0.png']
    //    "[https://replicate.delivery/yhqm/efsugdE9WfDPgJBjqaHbPHjaJdHK2eGTpfDHrzooZrrg7LgcC/out-0.png"]
  } catch (e) {
    return NextResponse.json({ Error: e });
  }
}
