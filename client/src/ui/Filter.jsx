import React from "react";
import Radio from "../components/Radio";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Buttons/Button";
import { getFlightState, updatePage } from "../store/flight";
import AirlineFilter from "../components/AirlineFilter";
import { getFlights } from "../views/Home";
function Filter({ filter, setFilter }) {
  const dispatch = useDispatch();
  const { page } = useSelector(getFlightState);

  // Update filter values
  const handleClick = (name, type) => {
    setFilter({
      ...filter,
      [type]: name,
    });
  };

  // getFlights by filters
  const handleFilterByCriteria = async () => {
    dispatch(updatePage(0));
    getFlights(dispatch, filter, page);
  };

  return (
    <div className="w-full">
      <div className="space-y-4">
        {/* Sort By */}
        <div>
          <p className="font-medium text-black">Sort by:</p>
          <select
            className="border-none outline-none py-2 w-full shadow-md rounded-md pl-2 mt-3"
            onChange={(e) => handleClick(e.target.value, "sort")}
          >
            <option value="lowest">Lowest Price</option>
            <option value="highest">Highest Price</option>
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
          <AirlineFilter setFilter={setFilter} filter={filter} />
        </div>
      </div>

      <Button
        btnClass={"mt-10"}
        title={"Filter"}
        onClick={handleFilterByCriteria} // getFlights çağrısını tetikleyen buton
      />
    </div>
  );
}

export default Filter;
