import React from "react";

type HeaderDisplayProps = {
  label: string;
  children?: React.ReactNode;
};

function HeaderDisplay({ label, children = <></> }: HeaderDisplayProps) {
  return (
    <div className="flex items-center pb-16">
      <span className="text-4xl font-semibold mr-4">{label}</span>
      {children}
    </div>
  );
}

export default HeaderDisplay;
