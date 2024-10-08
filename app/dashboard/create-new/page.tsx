"use client";
import { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import HeaderTitle from "../../../components/common/HeaderTitle";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import CustomLoading from "./_components/CustomLoading";
import { IVideoData, VideoDataContext } from "@/app/_context/VideoDataContext";
import { db } from "@/configs/db";
import { Users, VideoData } from "@/configs/schema";
import { useSession } from "next-auth/react";
import PlayerDialog from "../_components/PlayerDialog";
import { UserDetailsContext } from "@/app/_context/UserDetailsContext";
import { eq } from "drizzle-orm";
export interface IFormData {
  topic: string;
  imageStyle: string;
  duration: string;
}

const initialFormData: IFormData = {
  topic: "",
  imageStyle: "",
  duration: "",
};

export interface IVideoScript {
  imagePrompt: string;
  contentText: string;
}

export interface ICaptions {
  confidence: number;
  end: number;
  speaker: any;
  start: number;
  text: string;
}
const VIDEO_SCRIPT: string = `A cartoon sun rising over a mountain range, with fluffy clouds and a bright blue sky. The quote 'The sun is a daily reminder that we too can rise again from the darkness, that we too can shine our own light.' is written in a whimsical font at the bottom. A cartoon rocket blasting off into space, leaving a trail of colorful smoke.  The quote 'Don't be afraid to give up the good to go for the great.' is written in a bold font near the rocket. A cartoon character, a cheerful ladybug, standing on a flower with a big smile. The quote 'Be the change that you wish to see in the world.' is written in a flowing font around the ladybug. A cartoon scene with a young tree growing tall and strong with a rainbow in the background. The quote 'The only way to do great work is to love what you do.' is written in a playful font near the tree. A cartoon cityscape with buildings and a bright sun shining down.  The quote 'Believe you can and you're halfway there.' is written in a large font over the cityscape. A cartoon character, a friendly dog, wagging its tail and running through a field of flowers. The quote 'Life is too short to be anything but happy.' is written in a fun font at the bottom of the screen.`;
const FILE_URL: string =
  "https://firebasestorage.googleapis.com/v0/b/ai-short-video-generator-4d7e0.appspot.com/o/ai-short-video-files%2F063c9037-a031-43a1-b292-0a8cba472f37.mp3?alt=media&token=81f3c2f8-a265-49dd-b025-6ceee2fe1581";
const VIDEO_SCRIPT_DATA: IVideoScript[] = [
  {
    imagePrompt:
      "Realistic style illustration of a person with a stressed expression, surrounded by scattered papers and a overflowing to-do list. The background is cluttered and chaotic.",
    contentText:
      "Feeling overwhelmed? Juggling work, school, and personal life can leave you feeling stressed and exhausted.",
  },
  {
    imagePrompt:
      "Realistic style illustration of a person using a colorful planner with a cheerful expression. The planner is filled with organized tasks and schedules.",
    contentText:
      "But don't worry, there's a simple life hack that can help you regain control: time blocking!",
  },
];
const CreateNew = () => {
  const { toast } = useToast();
  const { userDetails, setUserDetails }: any = useContext(UserDetailsContext);
  const { data: session, status } = useSession();
  const { videoData, setVideoData }: any = useContext(VideoDataContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<IFormData>(initialFormData);
  const [playVideo, setPlayVideo] = useState<boolean>(false);
  const [videoId, setVideoId] = useState<number>(0);
  const [videoScriptData, setVideoScriptData] = useState<IVideoScript[]>([]);
  const [audioFileUrl, setAudioFileUrl] = useState<string>("");
  const [caption, setCaption] = useState<ICaptions[]>([]);
  const [imageList, setImageList] = useState<any[]>([]);
  const onHandleInputChange = (fieldName: string, fieldValue: string) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  /**
   * Handles the click event for the "Create" button.
   * Calls functions to generate video script, audio file, captions, and images.
   * Currently only calls generateImage() due to incomplete implementation.
   */
  const onCreateClickHandler = () => {
    if (userDetails?.credits > 0) {
      getVideoScript();
    }
    // generateAudioFile([]);
    // generateCaptions(FILE_URL);
    // generateImage();
  };

  /**
   * Makes a POST request to the /api/get-video-script endpoint to retrieve a video script based on the input from the user.
   * The video script is then used to generate an audio file and captions.
   * @param {string} prompt - The prompt used to generate the video script.
   */
  const getVideoScript = async () => {
    if (
      formData.duration !== "" &&
      formData.topic !== "" &&
      formData.imageStyle !== ""
    ) {
      setLoading(true);

      const prompt = `write a script to generate ${formData.duration} video on topic ${formData.topic} along with ai image prompt in ${formData.imageStyle} format for each scene and give me result in json format with imagePrompt and contentText as field`;
      // console.log(prompt);
      const result = await axios.post("/api/get-video-script", {
        prompt: prompt,
      });

      if (result.data.result) {
        setVideoData((prev: IVideoData) => ({
          ...prev,
          videoScript: result.data.result,
        }));
        setVideoScriptData(result.data.result);
        await generateAudioFile(result.data.result);
        await generateImage(result.data.result);

        setLoading(false);
      }
    } else {
      toast({
        title: "Fields cannot be empty",
      });
    }
  };
  /**
   * Takes an array of video script data and generates an audio file
   * using the {@link https://github.com/watsonbox/nextjs-ai-voice|watsonbox/nextjs-ai-voice} API.
   * The audio file is then stored in the component state via the `setAudioFileUrl` function.
   * @param {IVideoScript[]} videoScriptData - Array of video script data containing image prompts and content text.
   */
  const generateAudioFile = async (videoScriptData: IVideoScript[]) => {
    const script = videoScriptData
      ?.map((item: IVideoScript) => item.imagePrompt)
      .join(" ");

    const id = uuidv4();
    const res = await axios.post("/api/generate-audio", {
      id: id,
      text: script,
    });
    if (res.data.result) {
      setVideoData((prev: IVideoData) => ({
        ...prev,
        audioFileUrl: res.data.result,
      }));
      setAudioFileUrl(res.data.result);
      await generateCaptions(res.data.result);
    }
  };

  /**
   * Takes an audio file URL and generates captions using the
   * {@link https://github.com/watsonbox/nextjs-ai-voice|watsonbox/nextjs-ai-voice} API.
   * The captions are then stored in the component state via the `setCaption` function.
   * @param {string} fileUrl - Audio file URL.
   */
  const generateCaptions = async (fileUrl: string) => {
    const res = await axios.post("/api/generate-caption", {
      audioFileUrl: fileUrl,
    });
    if (res.data.result) {
      setVideoData((prev: IVideoData) => ({
        ...prev,
        captions: res.data.result,
      }));
      setCaption(res.data.result);
    }
  };

  /**
   * Takes an array of video script data and generates an image using the
   * {@link https://replicate.com/bytedance/sdxl-lightning-4step|bytedance/sdxl-lightning-4step} API.
   * The generated image is then stored in the component state via the `setImageList` function.
   */
  const generateImage = async (promptArray: IVideoScript[]) => {
    let imagesAray: string[] = [];
    for (const element of promptArray) {
      try {
        const res = await axios.post("/api/generate-image", {
          prompt: element.imagePrompt,
        });
        console.log(res.data.result);
        imagesAray.push(res.data.result);
      } catch (err) {
        console.log("Error in image generation : ", err);
      }
    }

    if (imagesAray.length > 0) {
      setVideoData((prev: any) => ({
        ...prev,
        imageList: imagesAray,
      }));
    }
    setImageList(imagesAray);
  };

  useEffect(() => {
    // console.log("videoData : ", videoData);
    if (
      videoData &&
      Object?.keys(videoData).length === 4 &&
      videoData.imageList?.length > 0
    ) {
      saveVideoData(videoData);
    }
  }, [videoData]);

  const saveVideoData = async (videoData: any) => {
    console.log("save data to database");
    setLoading(true);

    if (session?.user?.email && status === "authenticated") {
      const result = await db
        .insert(VideoData)
        .values({
          script: videoData.videoScript,
          topic: formData.topic,
          imageStyle: formData.imageStyle,
          duration: formData.duration,
          audioFileUrl: videoData.audioFileUrl,
          captions: videoData.captions,
          imageList: videoData.imageList,
          createdBy: session?.user?.email,
        })
        .returning({ id: VideoData.id });
      await updateUserCredits();
      setVideoId(result[0].id);
      setPlayVideo(true);
      console.log(result);
      setLoading(false);
      setFormData(initialFormData);
      setVideoData(null);
    }
  };

  const updateUserCredits = async () => {
    if (userDetails) {
      const res = await db
        .update(Users)
        .set({
          credits: userDetails?.credits - 10,
        })
        .where(eq(Users.email, userDetails?.email));
      setUserDetails((prev: any) => ({
        ...prev,
        credits: userDetails?.credits - 10,
      }));
    }
  };
  return (
    <div className="md:px-20">
      <HeaderTitle
        title="Create New"
        className="text-4xl text-primary text-center"
      />
      <div className="mt-10 shadow-md p-10">
        {/* select topic */}
        <SelectTopic onUserSelect={onHandleInputChange} />
        {/* select style */}
        <SelectStyle onUserSelect={onHandleInputChange} />
        {/* diratiopn */}
        <SelectDuration onUserSelect={onHandleInputChange} />
        {/* create button */}
        <Button className="mt-10 w-full" onClick={onCreateClickHandler}>
          Create Short Video
        </Button>
      </div>
      <CustomLoading loading={loading} />

      <PlayerDialog
        playVideo={playVideo}
        videoId={videoId}
        setPlayVideo={setPlayVideo}
      />
    </div>
  );
};

export default CreateNew;
