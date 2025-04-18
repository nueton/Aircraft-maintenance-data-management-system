import React from "react";
import { cn } from "@/helpers/cn";

type ActionButtonProps = {
  label: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  onClick?: () => void;
  disableButton?: boolean;
  style?: string;
  styleTextSize?: string;
};

function ActionButton({
  label,
  style = "",
  styleTextSize = "",
  iconLeft = null,
  iconRight = null,
  disableButton = false,
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
    <button
      onClick={onClick}
      disabled={disableButton}
      className={cn(
        "flex justify-center py-2 ml-6 rounded-2xl border-[0.1rem] border-gray-900 stroke-gray-900 hover:scale-105  ease-in-out duration-100 cursor-pointer disabled:bg-gray-400 disabled:text-white disabled:cursor-not-allowed disabled:border-gray-400 disabled:hover:scale-100 disabled:font-semibold disabled:stroke-white",
        styleDiv,
        style
      )}
    >
      {iconLeft}
      <span className={cn("text-lg", styleText, styleTextSize)}>{label}</span>
      {iconRight}
    </button>
  );
}

export default ActionButton;
