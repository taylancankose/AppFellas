import React from "react";
import FlightDensityChart from "../ui/FlightDensityChart";
import { useSelector } from "react-redux";
import { getFlightState } from "../store/flight";

function Discover() {
  const { flights } = useSelector(getFlightState);
  return (
    <div>
      <FlightDensityChart flightData={flights} />
    </div>
  );
}

export default Discover;
