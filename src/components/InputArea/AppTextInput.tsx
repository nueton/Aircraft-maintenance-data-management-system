import React, { useId } from "react";
import { cn } from "@/helpers/cn";

type AppInputProps = {
  label: string;
  value: string;
  onTextChange?: (text: string) => void;
  style?: string;
  emailAlert?: string;
  inputAlert?: boolean;
};

function AppTextInput({
  label,
  value,
  onTextChange,
  style = "",
  emailAlert = "",
  inputAlert = false,
}: AppInputProps) {
  const id = useId();
  return (
    <div className="flex flex-col h-20 text-lg w-full">
      <div>
        <label htmlFor={id} className="uppercase">
          {label}
        </label>
        <label className="ml-5 text-red-500">{emailAlert}</label>
      </div>
      <input
        value={value}
        onChange={(e) => {
          onTextChange?.(e.target.value);
        }}
        id={id}
        className={cn(
          "border border-gray-900 pl-2 w-full flex-1 rounded-lg mt-4 focus:outline-none focus:border-2",
          style,
          inputAlert ? "border-red-500 border-2 animate-headShake" : ""
        )}
        maxLength={60}
      />
    </div>
  );
}

export default AppTextInput;
