"use client";
import ColorTitle from "@/components/common/ColorTitle";
import GrayText from "@/components/common/GrayText";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export interface SelectDurationProps {
  onUserSelect: (fieldName: string, fieldValue: string) => void;
}
const SelectDuration = ({ onUserSelect }: SelectDurationProps) => {
  return (
    <div className="mt-4">
      <ColorTitle text={"Duration"} />
      <GrayText text="Select Duration for your video" />
      <Select
        onValueChange={(value) => {
          onUserSelect("duration", value);
        }}
      >
        <SelectTrigger className="w-full mt-2 p-6 text-lg">
          <SelectValue placeholder="Select Duration" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={"15 seconds"}>15 Seconds</SelectItem>
          <SelectItem value={"30 seconds"}>30 Seconds</SelectItem>
          <SelectItem value={"60 seconds"}>60 Seconds</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectDuration;
