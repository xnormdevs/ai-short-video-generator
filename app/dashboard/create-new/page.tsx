"use client";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import HeaderTitle from "../../../components/common/HeaderTitle";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import CustomLoading from "./_components/CustomLoading";
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
const CreateNew = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<IFormData>(initialFormData);
  const videoScript: string = `A cartoon sun rising over a mountain range, with fluffy clouds and a bright blue sky. The quote 'The sun is a daily reminder that we too can rise again from the darkness, that we too can shine our own light.' is written in a whimsical font at the bottom. A cartoon rocket blasting off into space, leaving a trail of colorful smoke.  The quote 'Don't be afraid to give up the good to go for the great.' is written in a bold font near the rocket. A cartoon character, a cheerful ladybug, standing on a flower with a big smile. The quote 'Be the change that you wish to see in the world.' is written in a flowing font around the ladybug. A cartoon scene with a young tree growing tall and strong with a rainbow in the background. The quote 'The only way to do great work is to love what you do.' is written in a playful font near the tree. A cartoon cityscape with buildings and a bright sun shining down.  The quote 'Believe you can and you're halfway there.' is written in a large font over the cityscape. A cartoon character, a friendly dog, wagging its tail and running through a field of flowers. The quote 'Life is too short to be anything but happy.' is written in a fun font at the bottom of the screen.`;
  const onHandleInputChange = (fieldName: string, fieldValue: string) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const onCreateClickHandler = () => {
    // getVideoScript();
    generateAudioFile([]);
  };
  // get video script
  const getVideoScript = async () => {
    if (
      formData.duration !== "" &&
      formData.topic !== "" &&
      formData.imageStyle !== ""
    ) {
      setLoading(true);

      const prompt = `write a script to generate ${formData.duration} video on topic ${formData.topic} along with ai image prompt in ${formData.imageStyle} format for each scene and give me result in json format with imagePrompt and contentText as field`;
      console.log(prompt);
      const result = await axios
        .post("/api/get-video-script", {
          prompt: prompt,
        })
        .then((res) => {
          console.log(res.data.result);
          generateAudioFile(res.data.result);
          // toast({
          //   title: "Video Script Generated",
          //   description: "Video Script Generated Successfully",
          // });
        });
      setLoading(false);
    }
  };
  const generateAudioFile = async (videoScriptData: IVideoScript[]) => {
    const script = videoScriptData
      ?.map((item: IVideoScript) => item.imagePrompt)
      .join(" ");
    console.log(videoScript);
    const id = uuidv4();
    await axios
      .post("/api/audio/generate-audio", {
        id: id,
        text: videoScript,
      })
      .then((res) => {
        console.log(res.data);
      });
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
    </div>
  );
};

export default CreateNew;
