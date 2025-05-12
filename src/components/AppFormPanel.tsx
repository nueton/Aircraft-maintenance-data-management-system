import React from "react";
import { cn } from "@/helpers/cn";

type AppFormPanelProps = {
  label: string;
  children: React.ReactNode;
  style?: string;
};

function AppFormPanel({ label, children, style = "" }: AppFormPanelProps) {
  return (
    <>
      <span className="text-xl font-semibold">{label}</span>
      <div
        className={cn(
          "grid grid-cols-2 lg:grid-cols-1 gap-10 w-full pt-10 text-xl",
          style
        )}
      >
        {children}
      </div>
    </>
  );
}

export default AppFormPanel;
