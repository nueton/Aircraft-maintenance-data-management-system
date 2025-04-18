import React, { useId } from "react";
import { cn } from "@/helpers/cn";

type LoginInputProps = {
  placeHolder: string;
  onTextChange?: (text: string) => void;
  style?: string;
};

function LoginInput({
  placeHolder,
  style = "",
  onTextChange,
}: LoginInputProps) {
  const id = useId();

  return (
    <input
      onChange={(e) => {
        onTextChange?.(e.target.value);
      }}
      placeholder={placeHolder}
      id={id}
      className={cn(
        "border-b-[1.5px] border-gray-900 w-4/5 focus:outline-none focus:border-b-2",
        style
      )}
    />
  );
}

export default LoginInput;
