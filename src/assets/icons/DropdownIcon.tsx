import React from "react";
import { cn } from "@/helpers/cn";

type DropdownIconProps = {
  style?: string;
};

function DropdownIcon({ style = "" }: DropdownIconProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={cn("self-center ", style)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 7.5L10 12.5L5 7.5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default DropdownIcon;
