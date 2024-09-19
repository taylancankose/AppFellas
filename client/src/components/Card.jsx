import React from "react";

function Card({ title, icon, bg }) {
  return (
    <div
      className={`
        lg:w-4/5 
        w-full
        lg:h-60
        h-36
        bg-cover 
        bg-no-repeat 
        bg-center 
        relative
        overflow-hidden
        block
        mb-3
        rounded-2xl
      `}
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gray-900 opacity-40 z-0"></div>

      {/* Icon and Text */}
      <div className="z-10 absolute bottom-2 lg:bottom-8 lg:left-4 left-2">
        <i className={`fa-solid fa-${icon} text-white text-lg shadow-lg`} />
        <p className="text-white md:text-xl font-bold shadow-lg">
          {title?.toUpperCase()}
        </p>
      </div>
    </div>
  );
}

export default Card;
