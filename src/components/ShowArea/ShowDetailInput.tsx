import React, { useId } from "react";

type ShowDetailInputProps = {
  label: string;
  children?: React.ReactNode;
};

function ShowDetailInput({ label, children = <></> }: ShowDetailInputProps) {
  const id = useId();

  return (
    <div className="flex flex-col h-[12.5rem] row-span-2 text-lg">
      <label htmlFor={id} className="font-semibold">
        {label}
      </label>
      <div id={id} className="w-full mt-4 flex flex-col flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}

export default ShowDetailInput;
