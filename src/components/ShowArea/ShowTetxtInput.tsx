import React, { useId } from "react";

type ShowTextInputProps = {
  label: string;
  content: string;
};

function ShowTextInput({ label, content }: ShowTextInputProps) {
  const id = useId();

  return (
    <div className="flex flex-col h-20 text-lg">
      <label htmlFor={id} className="font-semibold">
        {label}
      </label>
      <span id={id} className="w-full flex-1 mt-4 break-all overflow-y-auto">
        {content}
      </span>
    </div>
  );
}

export default ShowTextInput;
