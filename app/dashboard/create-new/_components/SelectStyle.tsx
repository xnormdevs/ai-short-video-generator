"use client";
import ColorTitle from "@/components/common/ColorTitle";
import GrayText from "@/components/common/GrayText";
import Image from "next/image";
import { useState } from "react";
export interface SelectStyleProps {
  onUserSelect: (fieldName: string, fieldValue: string) => void;
}
const styleOptions: { name: string; image: string }[] = [
  { name: "Realistic", image: "/realistic.png" },
  { name: "Cartoon", image: "/cartoon.png" },
  { name: "Anime", image: "/anime.png" },
  { name: "Future", image: "/colorfull.png" },
];

const SelectStyle = ({ onUserSelect }: SelectStyleProps) => {
  const [selectedStyle, setSelectedStyle] = useState<string | undefined>(
    undefined
  );
  return (
    <div className="mt-4">
      <ColorTitle text={"Style"} />
      <GrayText text="Select yuor video style" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-5 mt-2">
        {styleOptions.map((item, i) => (
          <div
            key={i}
            className={`relative cursor-pointer rounded-xl overflow-hidden ${
              selectedStyle === item.name ? "border-4 border-primary" : ""
            }`}
            onClick={() => {
              setSelectedStyle(item.name);
              onUserSelect("imageStyle", item.name);
            }}
          >
            <Image
              src={item.image}
              alt={item.name}
              width={100}
              height={100}
              className="h-72 object-cover rounded-lg w-full hover:scale-110 transition-all"
            />
            <h2 className="absolute h-10 p-1 bg-gradient-to-t from-slate-900 to-slate-600/60 bottom-0 w-full text-white text-center rounded-b-lg">
              {item.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectStyle;
