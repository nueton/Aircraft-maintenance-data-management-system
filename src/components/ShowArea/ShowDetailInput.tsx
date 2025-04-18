import React, { useId } from "react";

type ShowDetailInputProps = {
  label: string;
  content: string;
};

function ShowDetailInput({ label, content }: ShowDetailInputProps) {
  const id = useId();

  return (
    <div className="row-span-2">
      <div className="flex flex-col h-[12.5rem] text-lg">
        <label htmlFor={id} className="uppercase">
          {label}
        </label>
        <span id={id} className="w-full flex-1 mt-4 break-all overflow-y-auto">
          {content}
        </span>
      </div>
    </div>
  );
}

export default ShowDetailInput;
