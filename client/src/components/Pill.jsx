import React from "react";

function Pill({ title }) {
  return (
    <div className="border-2 py-2 2xl:px-6 px-3 rounded-md cursor-pointer">
      <p className="font-medium">{title}</p>
    </div>
  );
}

export default Pill;
