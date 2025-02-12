import React, { useId } from "react";

type AppDetailInputProps = {
  label: string;
};

function AppDetailInput({ label }: AppDetailInputProps) {
  const id = useId();

  return (
    <div className="row-span-2">
      <div className="flex flex-col h-[12.5rem]">
        <label htmlFor={id} className="uppercase">
          {label}
        </label>
        <textarea
          id={id}
          className="border border-gray-900 pt-1 px-2 w-full flex-1 rounded-lg mt-4 focus:outline-none focus:border-2"
        />
      </div>
    </div>
  );
}

export default AppDetailInput;
