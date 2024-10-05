"use client";
import { useState } from "react";
import HeaderTitle from "../../../components/common/HeaderTitle";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";

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

const CreateNew = () => {
  const [formData, setFormData] = useState<IFormData>(initialFormData);
  const onHandleInputChange = (fieldName: string, fieldValue: string) => {
    console.log(fieldName, fieldValue);
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
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
        <Button className="mt-10 w-full">Create Short Video</Button>
      </div>
    </div>
  );
};

export default CreateNew;
