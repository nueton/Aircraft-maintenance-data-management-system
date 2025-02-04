import React, { useId } from "react";

type AppInputProps = {
  label: string;
};

function AppTetxtInput({ label }: AppInputProps) {
  const id = useId();

  return (
    <div className="flex flex-col h-20">
      <label htmlFor={id} className="uppercase">
        {label}
      </label>
      <input
        id={id}
        className="border border-gray-900 pl-2 w-full flex-1 rounded-lg mt-4 focus:outline-none focus:border-2"
      />
    </div>
  );
}

export default AppTetxtInput;
