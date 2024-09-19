import React from "react";

function Button({ title, btnClass, onClick }) {
  return (
    <button
      onClick={onClick}
      className={` bg-purple-600  hover:bg-purple-700 font-semibold text-white px-4 py-2 rounded-md ${btnClass}`}
    >
      {title}
    </button>
  );
}

export default Button;
