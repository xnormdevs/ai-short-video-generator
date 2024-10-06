import React from "react";
export interface ColorTitleProps {
  text: string;
  className?: string;
}
const ColorTitle = ({ text, className }: ColorTitleProps) => {
  return <h2 className={`font-bold text-2xl text-primary ${className}`}>{text}</h2>;
};

export default ColorTitle;
