import React from "react";
export interface GrayTextProps {
  text: string;
  className?: string;
}
const GrayText = ({ text, className }: GrayTextProps) => {
  return <p className={`text-gray-500 ${className}`}>{text}</p>;
};

export default GrayText;
