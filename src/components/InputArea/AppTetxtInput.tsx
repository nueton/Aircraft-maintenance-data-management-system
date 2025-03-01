import React, { useId } from "react";

type AppInputProps = {
  label: string;
  value: string;
  onTextChange?: (text: string) => void;
};

function AppTetxtInput({ label, value, onTextChange }: AppInputProps) {
  const id = useId();

  return (
    <div className="flex flex-col h-20 text-lg">
      <label htmlFor={id} className="uppercase">
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => {
          onTextChange?.(e.target.value);
        }}
        id={id}
        className="border border-gray-900 pl-2 w-full flex-1 rounded-lg mt-4 focus:outline-none focus:border-2"
      />
    </div>
  );
}

export default AppTetxtInput;
