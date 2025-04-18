import React from "react";

type SideButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

function SideButton({ children, onClick }: SideButtonProps) {
  return (
    <button
      className="flex items-center font-medium w-11/12 text-xl ml-4 mt-3 p-2 rounded-2xl stroke-gray-900 hover:bg-slate-100 ease-in duration-75 cursor-pointer"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default SideButton;
