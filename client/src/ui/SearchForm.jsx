import React, { useState } from "react";
import InlineDiviButton from "../components/Buttons/InlineDiviButton";
import Input from "../components/Input";
import Button from "../components/Buttons/Button";

function SearchForm() {
  const [active, setActive] = useState("round");

  const handleActive = (e) => {
    setActive(e.target.name);
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <div className="flex md:flex-nowrap flex-wrap items-center justify-between mb-8 md:mb-0 mt-4">
        {/* Title Part */}
        <div className="flex items-center space-x-2 mb-4">
          <i className="fa-solid fa-plane text-gray-600 text-lg"></i>
          <h2 className="text-lg font-semibold">BOOK YOUR FLIGHT</h2>
        </div>
        <InlineDiviButton
          firstTitle={"Round trip"}
          secondTitle={"One way"}
          onClick={handleActive}
          active={active}
        />
      </div>
      {/* From & To, Dates */}
      <div className="flex flex-col md:flex-row md:space-x-4 mt-4 w-full">
        {/* From & To */}
        <div className="flex space-x-1 md:w-1/2 w-full mb-4 md:mb-0">
          {/* From */}
          <Input
            icon={"plane-departure"}
            placeholder={"From"}
            type={"text"}
            inputClass={"p-2 rounded-l-full w-full pl-10"}
          />

          {/* To */}
          <Input
            icon={"plane-arrival"}
            placeholder={"To"}
            type={"text"}
            inputClass={"p-2 rounded-r-full w-full pl-10"}
          />
        </div>
        {/* Dates */}
        <div className="flex space-x-1 md:w-1/2 w-full">
          <Input type={"date"} inputClass={"p-2 rounded-l-full w-full"} />
          <Input type={"date"} inputClass={"p-2 rounded-r-full w-full"} />
        </div>
      </div>
      <Button title={"Show flights"} btnClass={"mt-8"} />
    </div>
  );
}

export default SearchForm;
