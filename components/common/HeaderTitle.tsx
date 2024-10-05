import React from "react";
export interface HeaderTitleProps {
  title: string;
  className?: string;
}

const HeaderTitle = ({ title, className }: HeaderTitleProps) => {
  return <h2 className={`font-bold text-2xl items-center ${className}`}>{title}</h2>;
};

export default HeaderTitle;
