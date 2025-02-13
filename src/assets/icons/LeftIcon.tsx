import React from "react";

type LeftIconProps = {
  style?: string;
};

function LeftIcon({ style = "" }: LeftIconProps) {
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
        d="M12.5789 1L5 9.05263L12.5789 17.1053"
        stroke={style}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default LeftIcon;
