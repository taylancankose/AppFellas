import React from "react";

function Card({ title, icon, bg }) {
  return (
    <div
      className={`
        w-4/5 
        lg:h-60
        md:h-24
        h-16  
        bg-[url(${bg})]
        bg-cover 
        bg-no-repeat 
        bg-center 
        relative
        overflow-hidden
        block
        mb-3
        rounded-2xl
      `}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gray-900 opacity-40 z-0"></div>

      {/* Icon and Text */}
      <div className="z-10 absolute bottom-8 left-4">
        <i className={`fa-solid fa-${icon} text-white text-lg shadow-lg`} />
        <p className="text-white text-xl font-bold shadow-lg">
          {title?.toUpperCase()}
        </p>
      </div>
    </div>
  );
}

export default Card;
