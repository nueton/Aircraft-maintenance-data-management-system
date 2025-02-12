import React from "react";
import { cn } from "@/helpers/cn";

type ActionButtonProps = {
  label: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
};

function ActionButton({
  label,
  iconLeft = null,
  iconRight = null,
}: ActionButtonProps) {
  const styleDiv = iconRight === null ? (iconLeft === null ? "px-8" : "") : "";
  const styleText = iconRight === null ? (iconLeft === null ? "" : "") : "mr-1";
  return (
    <div
      className={cn(
        "flex justify-center py-2 pl-7 pr-4 ml-6 rounded-xl border-[0.1rem] border-gray-900 stroke-gray-900 hover:bg-slate-500 hover:border-slate-500 hover:text-white hover:stroke-white ease-in duration-75 cursor-pointer",
        styleDiv
      )}
    >
      {iconLeft}
      <span className={cn("flex justify-center items-center", styleText)}>
        {label}
      </span>
      {iconRight}
    </div>
  );
}

export default ActionButton;
