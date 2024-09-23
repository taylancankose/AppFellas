import React, { useState } from "react";
import InlineDiviButton from "../components/Buttons/InlineDiviButton";
import Input from "../components/Input";
import Button from "../components/Buttons/Button";
import { useDispatch, useSelector } from "react-redux";
import { getFlightState } from "../store/flight";
import { toast } from "react-toastify";
import { getFlights } from "../views/Home";

function SearchForm({ filter, setFilter }) {
  const [active, setActive] = useState("round");
  const today = new Date().toISOString().split("T")[0];
  const dispatch = useDispatch();
  const { page } = useSelector(getFlightState);

  const handleActive = (e) => {
    setActive(e.target.name);
  };

  const handleSelect = (e) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value.toUpperCase(),
    });
    console.log(filter);
  };

  const validateDates = () => {
    if (filter?.fromDateTime < today) {
      toast.error("From date cannot be earlier than today.");
      return false;
    }
    if (filter?.toDateTime < filter?.fromDateTime) {
      toast.error("To date cannot be earlier than from date.");
      return false;
    }
    return true;
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (validateDates()) {
      // Call getFlights and pass the current filter and page
      getFlights(dispatch, filter, page);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <div className="flex items-center justify-between h-full mb-6 md:flex-nowrap flex-wrap">
        {/* Title Part */}
        <div className="flex items-center space-x-2 h-full mb-4 md:mb-0">
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
            name="from"
          />

          {/* To */}
          <Input
            icon={"plane-arrival"}
            placeholder={"To (ICAO)"}
            type={"text"}
            inputClass={"p-2 rounded-r-full w-full pl-10"}
            name="location"
            value={filter?.location}
            onChange={handleSelect}
            maxLength={3}
          />
        </div>

        {/* Dates */}
        <div className="flex space-x-1 md:w-1/2 w-full">
          <Input
            name="fromDateTime"
            value={filter?.fromDateTime}
            onChange={handleSelect}
            type={"date"}
            inputClass={"p-2 rounded-l-full w-full"}
          />
          <Input
            name="toDateTime"
            value={filter?.toDateTime}
            onChange={handleSelect}
            type={"date"}
            inputClass={"p-2 rounded-r-full w-full"}
          />
        </div>
      </div>

      <Button title={"Show flights"} btnClass={"mt-8"} onClick={handleClick} />
    </div>
  );
}

export default SearchForm;
