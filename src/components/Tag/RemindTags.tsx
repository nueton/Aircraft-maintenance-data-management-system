import { cn } from "@/helpers/cn";
import React from "react";

type RemindTagsProps = {
  status: number;
};

const ColorTags = [
  {
    id: 1,
    text: "Pending Inspector Approved",
    textColor: "text-stone-600",
    bgColor: "bg-stone-100",
  },
  {
    id: 2,
    text: "Pending Approved Task",
    textColor: "text-amber-600",
    bgColor: "bg-amber-100",
  },
  {
    id: 3,
    text: "Approved Task",
    textColor: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    id: 4,
    text: "Waiting for submit repair",
    textColor: "text-pink-600",
    bgColor: "bg-pink-100",
  },
  {
    id: 5,
    text: "Pending Approve Repair",
    textColor: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    id: 6,
    text: "Approved Repair Task",
    textColor: "text-sky-600",
    bgColor: "bg-sky-100",
  },
  {
    id: 7,
    text: "Rejected",
    textColor: "text-red-600",
    bgColor: "bg-red-100",
  },
];

function RemindTags({ status }: RemindTagsProps) {
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

export default RemindTags;
