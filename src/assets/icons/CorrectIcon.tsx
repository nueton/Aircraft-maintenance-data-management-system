import React from "react";
type CorrectIconProps = {
  style?: string;
};

function CorrectIcon({ style }: CorrectIconProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={style}
    >
      <path
        d="M2.42426 11.1515L6.92642 15.7576L18.1818 4.24243"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default CorrectIcon;
