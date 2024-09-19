import React, { useState } from "react";
import Radio from "../components/Radio";
import { useDispatch } from "react-redux";
import {
  getFlights,
  getFlightsByDirection,
} from "../store/actions/flightActions";
import { formatDateToISO } from "../utils/formatters";
import Button from "../components/Buttons/Button";

function Filter({ date, page }) {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({
    sort: "lowest",
    arrival: "",
    stops: "",
    airline: "",
    direction: "",
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

  const handleFilterByDirection = () => {
    if (filter.direction === "") {
      dispatch(
        getFlights({
          page: page,
          fromDateTime: formatDateToISO(date.fromDateTime),
          toDateTime: formatDateToISO(date.toDateTime),
        })
      );
    } else {
      dispatch(
        getFlightsByDirection({
          page: page,
          direction: filter.direction,
          from: formatDateToISO(date.fromDateTime),
          to: formatDateToISO(date.toDateTime),
        })
      );
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

      {/* Direction */}
      <div>
        <p className="font-medium text-black">Filter By Direction</p>
        <Radio
          onClick={(name) => handleClick(name, "direction")}
          label="To Amsterdam"
          name="A"
          stateValue={filter.direction}
        />
        <Radio
          onClick={(name) => handleClick(name, "direction")}
          label="From Amsterdam"
          name="D"
          stateValue={filter.direction}
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

      <Button title={"Filter"} onClick={handleFilterByDirection} />
    </div>
  );
}

export default Filter;
