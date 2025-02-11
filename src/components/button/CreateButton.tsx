import React from "react";

type CreateButtonProps = {
  children: React.ReactNode;
};

function CreateButton({ children }: CreateButtonProps) {
  return (
    <div className="flex justify-center w-28 py-2 pl-3 pr-1 ml-6 rounded-xl border-[0.1rem] border-gray-900 stroke-gray-900 hover:bg-slate-500 hover:border-slate-500 hover:text-white hover:stroke-white ease-in duration-75 cursor-pointer">
      {children}
    </div>
  );
}

export default CreateButton;
