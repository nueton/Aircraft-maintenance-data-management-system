import React, { useId } from "react";
import { cn } from "@/helpers/cn";

type AppDetailInputProps = {
  label: string;
  value: string;
  onTextChange?: (text: string) => void;
  style?: string;
  emailAlert?: string;
  inputAlert?: boolean;
};

function AppDetailInput({
  label,
  value,
  onTextChange,
  style = "",
  emailAlert = "",
  inputAlert = false,
}: AppDetailInputProps) {
  const id = useId();

  return (
    <div className="row-span-2">
      <div className="flex flex-col h-[12.5rem] text-lg">
        <div>
          <label htmlFor={id} className="font-semibold">
            {label}
          </label>
          <label className="ml-5 text-red-500 text-base font-semibold">
            {emailAlert}
          </label>
        </div>

        <textarea
          value={value}
          onChange={(e) => {
            onTextChange?.(e.target.value);
          }}
          id={id}
          className={cn(
            "border border-gray-900 pt-1 px-2 w-full flex-1 rounded-lg mt-4 focus:outline-none focus:border-2",
            style,
            inputAlert ? "border-red-500 border-2 animate-headShake" : ""
          )}
        />
      </div>
    </div>
  );
}

export default AppDetailInput;
