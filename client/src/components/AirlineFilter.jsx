import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getAirlineState } from "../store/airline";

const AirlineFilter = ({ setFilter, filter }) => {
  const { airline } = useSelector(getAirlineState);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("");
  const [showAll, setShowAll] = useState(false);

  const filteredOptions = airline?.filter((option) =>
    option?.publicName?.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (icao) => {
    setSelected(icao);
    setSearch(""); // clean search term after selection
    setShowAll(false); // close menu after selected

    // Update the parent filter state
    setFilter({
      ...filter,
      airline: icao,
    });
  };

  return (
    <div className="relative inline-block text-left w-full">
      <div className="my-4 flex items-center justify-between">
        <p className="font-bold">Airlines</p>
        <button onClick={() => setShowAll(!showAll)} className="text-blue-500">
          {showAll ? "Hide All" : "Show All"}
        </button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Search airline..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-md p-2 w-full mb-2"
        />
      </div>
      <div className="mt-2">
        <span className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700">
          {selected || "Please select"}
        </span>
        {/* If search term exists show the results */}
        <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-4">
          {search && filteredOptions?.length > 0 ? (
            filteredOptions?.map((option, index) => (
              <div
                key={index}
                onClick={() => handleSelect(option?.icao)}
                className="cursor-pointer hover:bg-gray-100 p-2"
              >
                {option?.publicName}
              </div>
            ))
          ) : search ? (
            <div className="p-2 text-gray-500">Result could not find...</div>
          ) : (
            showAll && // if clicked show all, show all results
            airline.map((option, index) => (
              <div
                key={index}
                onClick={() => handleSelect(option?.icao)}
                className="cursor-pointer hover:bg-gray-100 p-2"
              >
                {option?.publicName}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AirlineFilter;
