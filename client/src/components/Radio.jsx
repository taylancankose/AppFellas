import React from "react";

function Radio({ onClick, name, stateValue, label }) {
  return (
    <div
      className="items-center space-x-2 my-1 flex cursor-pointer"
      name={name}
      id={name}
      onClick={() => onClick(name)}
    >
      <div
        className={`w-3 h-3 rounded-full  ${
          stateValue === name ? "bg-purple-600" : "border border-purple-600"
        }`}
        name={name}
      />
      <p className="">{label}</p>
    </div>
  );
}

export default Radio;
