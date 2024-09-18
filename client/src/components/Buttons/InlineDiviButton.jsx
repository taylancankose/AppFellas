import React from "react";

function InlineDiviButton({ onClick, firstTitle, secondTitle, active }) {
  return (
    <div className="inline-flex">
      <button
        onClick={onClick}
        name="round"
        className={`${
          active === "round"
            ? "bg-purple-800 text-white hover:bg-purple-900"
            : "bg-purple-100 text-purple-800 hover:bg-purple-200"
        } font-medium py-2 px-4 rounded-l-full`}
      >
        {firstTitle}
      </button>
      <button
        onClick={onClick}
        name="one"
        className={`${
          active === "one"
            ? "bg-purple-800 text-white hover:bg-purple-900"
            : "bg-purple-100 text-purple-800 hover:bg-purple-200"
        }   font-medium py-2 px-4 rounded-r-full`}
      >
        {secondTitle}
      </button>
    </div>
  );
}

export default InlineDiviButton;
