import { cn } from "@/helpers/cn";
import React from "react";

type AppButtonProps = {
  title: string;
  rightIcon?: React.ReactNode;
  className?: string;
};

function AppButton({
  title,
  rightIcon = <></>,
  className = "",
}: AppButtonProps) {
  return (
    <button
      className={cn(
        "flex justify-center items-center gap-2 text-lg capitalize min-w-36 h-12 px-5 border-2 rounded-xl border-gray-900 stroke-gray-900 hover:bg-slate-500  hover:border-slate-500 hover:text-white hover:stroke-white ease-in duration-75 ",
        className
      )}
    >
      {rightIcon}
      {title}
      {rightIcon}
    </button>
  );
}

export default AppButton;
