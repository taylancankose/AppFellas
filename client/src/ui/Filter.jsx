import React, { useState } from "react";
import Radio from "../components/Radio";

function Filter() {
  const [filter, setFilter] = useState({
    sort: "lowest",
    arrival: "",
    stops: "",
    airline: "",
  });

  const handleClick = (name, type) => {
    if (name === filter[type]) {
      setFilter({
        ...filter,
        [type]: "",
      });
    } else {
      setFilter({
        ...filter,
        [type]: name,
      });
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Sort By */}
      <div>
        <p className="font-medium text-black">Sort by:</p>
        <select className="border-none outline-none py-2 w-full shadow-md rounded-md pl-2 mt-3">
          <option>Lowest Price</option>
          <option>Highest Price</option>
        </select>
      </div>

      {/* Arrival Time */}
      <div>
        <p className="font-medium text-black">Arrival Time</p>
        <Radio
          onClick={(name) => handleClick(name, "arrival")}
          label="05:00 AM - 11:59 AM"
          name="morning"
          stateValue={filter.arrival}
        />
        <Radio
          onClick={(name) => handleClick(name, "arrival")}
          label="12:00 AM - 05:59 PM"
          name="night"
          stateValue={filter.arrival}
        />
      </div>

      {/* Stops */}
      <div>
        <p className="font-medium text-black">Stops</p>
        <Radio
          onClick={(name) => handleClick(name, "stops")}
          label="Nonstop"
          name="nonstop"
          stateValue={filter.stops}
        />
        <Radio
          onClick={(name) => handleClick(name, "stops")}
          label="1 Stop"
          name="one-stop"
          stateValue={filter.stops}
        />
        <Radio
          onClick={(name) => handleClick(name, "stops")}
          label="2 Stops"
          name="two-stop"
          stateValue={filter.stops}
        />
      </div>

      {/* Airline companies */}
      <div>
        <p className="font-medium text-black">Airlines Included</p>
        <Radio
          onClick={(name) => handleClick(name, "airline")}
          label="Alitalia"
          name="alitalia"
          stateValue={filter.airline}
        />
        <Radio
          onClick={(name) => handleClick(name, "airline")}
          label="Lufthansa"
          name="ufthansa"
          stateValue={filter.airline}
        />
        <Radio
          onClick={(name) => handleClick(name, "airline")}
          label="Air France"
          name="air-france"
          stateValue={filter.airline}
        />
        <Radio
          onClick={(name) => handleClick(name, "airline")}
          label="Turkish Airlines"
          name="thy"
          stateValue={filter.airline}
        />
      </div>
    </div>
  );
}

export default Filter;
