import React from "react";

function AddIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      className="absolute right-5 self-center w-10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 20.625C16.3157 20.625 20.625 16.3157 20.625 11C20.625 5.68426 16.3157 1.375 11 1.375C5.68426 1.375 1.375 5.68426 1.375 11C1.375 16.3157 5.68426 20.625 11 20.625Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M6.875 11H15.125" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11 6.875V15.125" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default AddIcon;
