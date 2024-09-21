import React from "react";

function PriceCard({ price, title }) {
  return (
    <div className="border rounded-md w-24 h-28 flex flex-col items-center justify-center">
      <h3 className="font-medium text-lg mb-4">{price}</h3>
      <p className="text-gray-400 text-sm">{title}</p>
    </div>
  );
}

export default PriceCard;
