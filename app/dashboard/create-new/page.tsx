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
  const onHandleInputChange = (fieldName: string, fieldValue: string) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const onCreateClickHandler = () => {
    getVideoScript();
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
    console.log(script);
    const id = uuidv4();
    await axios
      .post("/api/audio/generate-audio", {
        id: id,
        text: script,
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
