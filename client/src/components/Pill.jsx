import React from "react";

function Pill({ title }) {
  return (
    <div className="border-2 py-2 px-6 rounded-md cursor-pointer">
      <p className="font-medium">{title}</p>
    </div>
  );
}

export default Pill;
