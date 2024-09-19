import React from "react";
import { formatISOTime, formatTime } from "../utils/formatters";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { makeReservation } from "../store/actions/flightActions";

function FlightCards({ flights }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleReservation = ({ flightID, price }) => {
    try {
      dispatch(
        makeReservation({
          flightID: flightID,
          price: price,
        })
      )
        .then(() => {
          navigate(`/my-flights/66ec3222b86a4628eaf110ad`);
          toast.success("Flight has been booked successfully!");
        })
        .catch(() => {
          toast.error("Booking failed. Please try again.");
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {flights?.length > 0 &&
        flights?.map((flight) => {
          return (
            <div className="mb-6" key={flight?._id}>
              <div className="bg-white shadow-md rounded-t-lg rounded-br-lg p-3 md:py-6 md:px-8 relative">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">
                      {flight?.flightDirection === "D"
                        ? "Amsterdam - " + flight?.destination?.city
                        : flight?.destination?.city + " - Amsterdam"}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {flight?.estimatedLandingTime}
                    </p>
                  </div>
                  <h4 className="">PNR: {flight?.mainFlight}</h4>
                </div>
                {/* Flight Info */}
                <div className="flex justify-between items-center mt-4 mb-10 flex-wrap md:flex-nowrap">
                  {/* Departure */}
                  <div className="space-y-1 text-gray-700 md:w-fit w-full items-center flex flex-col md:flex-none md:items-start mb-4 md:mb-0">
                    <div className="flex items-center text-sm ">
                      <i className="fa-solid fa-plane-departure mr-2"></i>
                      <p>Departure</p>
                    </div>
                    <p className="text-xl font-semibold">
                      {flight?.scheduleTime
                        ? formatTime(flight?.scheduleTime)
                        : formatISOTime(flight?.scheduleDateTime)}
                    </p>
                    <p className="text-sm text-gray-700">
                      Airport:{" "}
                      {flight?.flightDirection === "D"
                        ? "AMS"
                        : flight?.destination.iata}
                    </p>
                  </div>

                  {/* Line */}
                  <div className="h-1 bg-gray-300 mx-4 hidden md:flex md:w-24 w-full"></div>

                  {/* Airway */}
                  <div className="space-y-3 justify-center items-center flex flex-col md:w-fit w-full">
                    <p className="text-xs font-medium text-gray-600">
                      {flight?.airline?.publicName}
                    </p>
                    <i className="fa-solid fa-plane text-center text-purple-800"></i>
                    <p className="text-xs font-medium text-gray-600">2h 23m</p>
                  </div>

                  {/* Line */}
                  <div className=" h-1 bg-gray-300 mx-4 hidden md:flex md:w-24 w-full "></div>

                  {/* Arrival */}
                  <div className="space-y-3 text-gray-700 md:w-fit w-full items-center flex flex-col md:flex-none md:items-start mt-4 md:mt-0">
                    <div className="flex items-center text-sm ">
                      <i className="fa-solid fa-plane-arrival mr-2"></i>
                      <p>Arrival</p>
                    </div>
                    <p className="text-xl font-semibold">
                      {flight?.estimatedLandingTime
                        ? formatISOTime(flight?.estimatedLandingTime)
                        : formatISOTime(flight?.scheduleDateTime)}
                    </p>
                    <p className="text-sm text-gray-700">
                      {" "}
                      Airport:{" "}
                      {flight?.flightDirection === "A"
                        ? "AMS"
                        : flight?.destination.iata}
                    </p>
                  </div>
                </div>

                {/* Price */}
                <div>
                  <p className="font-bold text-purple-800 text-lg">
                    Price: $200
                  </p>
                  <p className="text-gray-700 text-sm font-medium">
                    Round Trip
                  </p>
                </div>
                {/* Book */}
                <button
                  onClick={() =>
                    handleReservation({
                      flightID: flight._id,
                      price: 200,
                    })
                  }
                  className="items-center justify-center flex absolute right-0 bottom-0 bg-purple-900 lg:w-48 lg:h-20 w-36 h-14  rounded-tl-lg rounded-br-lg cursor-pointer hover:bg-purple-950"
                >
                  <p className="text-center text-white font-bold">
                    Book Flight
                  </p>
                </button>
              </div>
              {/* Check */}
              <div className="flex items-center justify-center w-40 h-12 bg-purple-200 rounded-b-xl ">
                <p className="text-purple-800 font-medium underline cursor-pointer">
                  Check the details
                </p>
              </div>
            </div>
          );
        })}
    </>
  );
}

export default FlightCards;
