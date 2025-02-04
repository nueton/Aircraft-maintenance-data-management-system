import React from "react";

type AppFormPanelProps = {
  children: React.ReactNode;
};

function AppFormPanel({ children }: AppFormPanelProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-1 gap-6 w-full pt-10 text-xl">
      {children}
    </div>
  );
}

export default AppFormPanel;
