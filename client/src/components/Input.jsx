import React from "react";

function Input({ name, value, icon, placeholder, type, inputClass, onChange }) {
  return (
    <div className="relative w-full flex">
      <div className="absolute inset-y-0 start-1 flex items-center ps-3 pointer-events-none">
        <i className={`fa-solid fa-${icon} text-purple-700`}></i>
      </div>
      <input
        type={type}
        className={`border-2  text-gray-900 text-sm  ${inputClass}`}
        placeholder={placeholder}
        required
        onChange={onChange}
        name={name}
        value={value}
      />
    </div>
  );
}

export default Input;
