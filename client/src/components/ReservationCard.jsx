import React from "react";
import { formatISOTime, formatTime } from "../utils/formatters";
import PriceCard from "./PriceCard";

function ReservationCard({ reservation }) {
  const { flight } = reservation;
  return (
    <div className="w-full 2xl:w-4/5 p-4 overflow-hidden m-auto">
      <div className="flex flex-wrap lg:flex-nowrap items-center justify-between p-8 bg-white shadow-md rounded-lg ">
        <div className="flex items-start gap-8 ">
          {/* Logo */}
          <i className="fa-solid fa-plane-departure mt-2 text-xl"></i>

          {/* Info */}
          <div>
            {/* Hours */}
            <h4 className="text-2xl mb-3">
              {flight?.scheduleTime
                ? formatTime(flight?.scheduleTime)
                : formatISOTime(flight?.scheduleDateTime)}{" "}
              -{" "}
              {flight?.estimatedLandingTime
                ? formatISOTime(flight?.estimatedLandingTime)
                : formatISOTime(flight?.scheduleDateTime)}
            </h4>
            {/* Flight Info */}
            <div className="items-center flex flex-wrap md:flex-nowrap justify-between gap-6">
              {/* Airline */}
              <div>
                <h4 className="">{flight?.airline?.publicName}</h4>
                <p className="text-sm text-sky-500 mt-1">Flight Details</p>
              </div>
              {/* Route */}
              <div>
                <h4>Nonstop</h4>
                <p className="text-sm text-gray-400 mt-1">1h 32m</p>
              </div>
              {/* Destination */}
              <div>
                <h4>
                  {" "}
                  {flight?.flightDirection === "D"
                    ? "Ams to " + flight?.destination.iata
                    : flight?.destination.iata + " to AMS"}
                </h4>
                <p className="text-sm text-gray-400 mt-1">DL 1443</p>
              </div>
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="flex flex-wrap md:flex-nowrap items-center md:justify-between justify-center gap-4 md:gap-6 mt-6 lg:mt-0">
          <PriceCard price={"$156"} title={"Main"} />
          <PriceCard price={"$204"} title={"Comfort+"} />
          <PriceCard price={"$386"} title={"Delta One"} />
          <PriceCard price={"$489"} title={"Business"} />
          <PriceCard price={"$747"} title={"Business+ "} />
        </div>
      </div>
    </div>
  );
}

export default ReservationCard;
