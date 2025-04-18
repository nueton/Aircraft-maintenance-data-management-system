import React from "react";

type HeaderpanelProps = {
  children: React.ReactNode;
};

function Headerpanel({ children }: HeaderpanelProps) {
  return (
    <div className="absolute inset-0 left-80 transition-all">
      <div className="flex justify-end items-end w-full pr-10 h-16 text-lg">
        <span className="text-gray-700 mr-2">Welcome, </span>
        <span className="text-blue-600 cursor-pointer">
          {typeof localStorage !== "undefined"
            ? localStorage.getItem("name")
            : ""}
        </span>
      </div>
      <div className="p-10">{children}</div>
    </div>
  );
}

export default Headerpanel;
