"use client";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import GrayText from "@/components/common/GrayText";
export interface SelectTopicProps {
  onUserSelect: (fieldName: string, fieldValue: string) => void;
}
const SelectTopic = ({ onUserSelect }: SelectTopicProps) => {
  const optioins = [
    "Custom Prompt",
    "Random AI Story",
    "Scary Story",
    "Funny Skit",
    "Inspirational Quote Animation",
    "Motivational Speech",
    "Science Fact Animation",
    "Fantasy Adventure",
    "Interactive Quiz",
    "Daily Horoscope",
    "AI-generated Joke",
    "Romantic Short",
    "Action Scene",
    "Mystery Plot Teaser",
    "Life Hack Explainer",
    "Historical Moment Recreation",
    "Personalized Poem",
    "Futuristic Sci-Fi Snippet",
    "Thriller Scene",
    "Crime Investigation Teaser",
  ];
  const [selectedOption, setSelectedOption] = useState(optioins[0]);

  return (
    <div>
      <h2 className="font-bold text-2xl text-primary">Content</h2>
      <GrayText text="What is the topic of your video?" />
      <Select
        onValueChange={(value) => {
          setSelectedOption(value);
          value !== "Custom Prompt" && onUserSelect("topic", value);
        }}
      >
        <SelectTrigger className="w-full mt-2 p-6 text-lg">
          <SelectValue placeholder="Content Type" />
        </SelectTrigger>
        <SelectContent>
          {optioins.map((option, i) => (
            <SelectItem key={i} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedOption === "Custom Prompt" && (
        <Textarea
          onChange={(e) => onUserSelect("topic", e.target.value)}
          className="mt-2"
          placeholder="Write prompt which you want to generate video"
        />
      )}
    </div>
  );
};

export default SelectTopic;
