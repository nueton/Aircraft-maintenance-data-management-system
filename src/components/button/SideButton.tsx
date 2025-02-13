import React from "react";

type SideButtonProps = {
  children: React.ReactNode;
};

function SideButton({ children }: SideButtonProps) {
  return (
    <div className="flex items-center font-medium w-11/12 text-xl ml-4 mt-3 p-2 rounded-2xl stroke-gray-900 hover:bg-slate-100 ease-in duration-75 cursor-pointer">
      {children}
    </div>
  );
}

export default SideButton;
