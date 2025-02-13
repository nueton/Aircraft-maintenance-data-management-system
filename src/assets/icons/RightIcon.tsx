import React from "react";

type RightIconProps = {
  style?: string;
};

function RightIcon({ style = "" }: RightIconProps) {
  return (
    <svg
      width="18"
      height="19"
      viewBox="0 0 18 19"
      fill="none"
      className="self-center"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.42105 1L13 9.05263L5.42105 17.1053"
        stroke={style}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default RightIcon;
