import React from "react";

type AppFormPanelProps = {
  label: string;
  children: React.ReactNode;
};

function AppFormPanel({ label, children }: AppFormPanelProps) {
  return (
    <>
      <span className="text-xl font-semibold">{label}</span>
      <div className="grid grid-cols-2 lg:grid-cols-1 gap-10 w-full pt-10 text-xl">
        {children}
      </div>
    </>
  );
}

export default AppFormPanel;
