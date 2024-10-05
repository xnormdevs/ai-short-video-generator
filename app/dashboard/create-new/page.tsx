"use client";
import { useState } from "react";
import HeaderTitle from "../../../components/common/HeaderTitle";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";

const CreateNew = () => {
  const [formData, setFormData] = useState({});
  const onHandleInputChange = (fieldName: string, fieldValue: string) => {
    console.log(fieldName, fieldValue);
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
        <SelectStyle />
        {/* diratiopn */}
        {/* create button */}
      </div>
    </div>
  );
};

export default CreateNew;
