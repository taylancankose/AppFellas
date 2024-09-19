import React from "react";
import Star from "../components/Star";
import Pill from "../components/Pill";

function FlightFilter() {
  return (
    <div className="bg-white w-full flex flex-wrap xl:flex-nowrap items-center justify-between p-6 space-y-4 xl:space-y-0">
      {/* Pill Container */}
      <div className="flex items-center gap-4 xl:flex-nowrap flex-wrap justify-center md:justify-start">
        <Pill title={"Times"} />
        <Pill title={"Stops"} />
        <Pill title={"Airlines"} />
        <Pill title={"Airports"} />
        <Pill title={"Amenties"} />
        <div>
          <p className="text-sky-500 font-medium">Edit Search</p>
        </div>
      </div>
      {/* Star Container */}
      <div className="flex items-center gap-4 xl:flex-nowrap flex-wrap justify-center md:justify-start">
        <Star active={1} totalStar={6} />
        <div className="h-6 border mx-2 md:inline hidden" />
        <Star active={2} totalStar={6} />
        <div className="h-6 border mx-2 md:inline hidden" />
        <Star active={3} totalStar={6} />
        <div className="h-6 border mx-2 md:inline hidden" />
        <Star active={4} totalStar={6} />
        <div className="h-6 border mx-2 md:inline hidden" />
        <Star active={5} totalStar={6} />
        <div className="h-6 border mx-2 md:inline hidden" />
        <Star active={6} totalStar={6} />
      </div>
    </div>
  );
}

export default FlightFilter;
