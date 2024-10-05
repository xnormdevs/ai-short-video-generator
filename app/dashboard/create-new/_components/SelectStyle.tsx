import GrayText from "@/components/common/GrayText";
import React from "react";
const styleOptions: { name: string; image: String }[] = [
  { name: "Realistic", image: "realistic.png" },
  { name: "Cartoon", image: "cartoon.png" },
  { name: "Anime", image: "anime.png" },
  { name: "Future", image: "colorfull.png" },
];

const SelectStyle = () => {
  return (
    <div>
      <GrayText text="What is the topic of your video?" />
    </div>
  );
};

export default SelectStyle;
