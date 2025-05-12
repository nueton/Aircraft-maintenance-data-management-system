import React from "react";

type HeaderDetailDisplayProps = {
  label: string;
  detail: string;
  children?: React.ReactNode;
};

function HeaderDetailDisplay({
  label,
  children = <></>,
  detail,
}: HeaderDetailDisplayProps) {
  return (
    <div className="flex flex-col pb-[3.5rem]">
      <div className="flex items-center justify-start">
        <span className="text-4xl font-semibold mr-4">{label}</span>
        {children}
      </div>
      <label className="text-gray-400 font-semibold text-lg italic h-2">
        JCN: {detail}
      </label>
    </div>
  );
}

export default HeaderDetailDisplay;
