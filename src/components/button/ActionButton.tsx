import React from "react";
import { cn } from "@/helpers/cn";

type ActionButtonProps = {
  label: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  onClick?: () => void;
};

function ActionButton({
  label,
  iconLeft = null,
  iconRight = null,
  onClick,
}: ActionButtonProps) {
  const styleDiv =
    iconRight === null
      ? iconLeft === null
        ? "px-8"
        : "pl-5 pr-7"
      : "pl-7 pr-4";
  const styleText =
    iconRight === null ? (iconLeft === null ? "" : "ml-2") : "mr-2";
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex justify-center py-2 ml-6 rounded-xl border-[0.1rem] border-gray-900 stroke-gray-900 hover:bg-slate-500 hover:border-slate-500 hover:text-white hover:stroke-white ease-in duration-75 cursor-pointer",
        styleDiv
      )}
    >
      {iconLeft}
      <span className={cn("text-lg", styleText)}>{label}</span>
      {iconRight}
    </div>
  );
}

export default ActionButton;
