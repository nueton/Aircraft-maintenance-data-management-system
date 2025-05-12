import { cn } from "@/helpers/cn";
import React from "react";

type StatusTagsProps = {
  status: string;
};

const ColorTags = [
  {
    id: "admin",
    text: "Admin",
    textColor: "text-fuchsia-600",
    bgColor: "bg-fuchsia-100",
  },
  {
    id: "supervisor",
    text: "Supervisor",
    textColor: "text-stone-600",
    bgColor: "bg-stone-100",
  },
  {
    id: "inspector",
    text: "inspector",
    textColor: "text-amber-600",
    bgColor: "bg-amber-100",
  },
  {
    id: "user",
    text: "User",
    textColor: "text-cyan-600",
    bgColor: "bg-cyan-100",
  },
  {
    id: "haspassword",
    text: "has password",
    textColor: "text-teal-600",
    bgColor: "bg-teal-100",
  },
  {
    id: "nothaspassword",
    text: "Reset password",
    textColor: "text-rose-600",
    bgColor: "bg-rose-100",
  },
];

function StatusTags({ status }: StatusTagsProps) {
  const matchedColor = ColorTags.find((c) => c.id === status);
  if (matchedColor !== undefined) {
    return (
      <span
        className={cn(
          "px-3 py-1 rounded-lg font-bold",
          matchedColor.textColor,
          matchedColor.bgColor
        )}
      >
        {matchedColor.text}
      </span>
    );
  }
}

export default StatusTags;
