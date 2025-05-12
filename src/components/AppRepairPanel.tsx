import React from "react";

type AppRepairPanelProps = {
  label: string;
  children: React.ReactNode;
};

function AppRepairPanel({ label, children }: AppRepairPanelProps) {
  return (
    <>
      <span className="text-xl font-semibold">{label}</span>
      <div className="grid grid-cols-3 lg:grid-cols-1 gap-10 w-full pt-3 text-xl">
        {children}
      </div>
    </>
  );
}

export default AppRepairPanel;
