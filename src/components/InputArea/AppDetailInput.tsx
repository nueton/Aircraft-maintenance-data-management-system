import React, { useId } from "react";
import { cn } from "@/helpers/cn";

type AppDetailInputProps = {
  label: string;
  value: string;
  onTextChange?: (text: string) => void;
  style?: string;
};

function AppDetailInput({
  label,
  value,
  onTextChange,
  style = "",
}: AppDetailInputProps) {
  const id = useId();

  return (
    <div className="row-span-2">
      <div className="flex flex-col h-[12.5rem] text-lg">
        <label htmlFor={id} className="uppercase">
          {label}
        </label>
        <textarea
          value={value}
          onChange={(e) => {
            onTextChange?.(e.target.value);
          }}
          id={id}
          className={cn(
            "border border-gray-900 pt-1 px-2 w-full flex-1 rounded-lg mt-4 focus:outline-none focus:border-2",
            style
          )}
        />
      </div>
    </div>
  );
}

export default AppDetailInput;
