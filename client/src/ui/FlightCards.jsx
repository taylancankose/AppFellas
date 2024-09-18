import React from "react";

function FlightCards() {
  return (
    <div className="">
      <div className="bg-white shadow-md rounded-t-lg rounded-br-lg p-3 md:py-6 md:px-8 relative">
        <h3 className="font-semibold">Milano - Madrid</h3>
        {/* Flight Info */}
        <div className="flex justify-between items-center mt-4 mb-10 flex-wrap md:flex-nowrap">
          {/* Departure */}
          <div className="space-y-1 text-gray-700 md:w-fit w-full items-center flex flex-col md:flex-none md:items-start mb-4 md:mb-0">
            <div className="flex items-center text-sm ">
              <i className="fa-solid fa-plane-departure mr-2"></i>
              <p>Departure</p>
            </div>
            <p className="text-xl font-semibold">7:30 AM</p>
            <p className="text-sm text-gray-700">Airport: MXP</p>
          </div>

          {/* Line */}
          <div className="h-1 bg-gray-300 mx-4 hidden md:flex md:w-24 w-full"></div>

          {/* Airway */}
          <div className="space-y-3 justify-center items-center flex flex-col md:w-fit w-full">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKcetXQ9L16CD9amLUDPSGlj43kKtqX540CQ&s"
              className="w-10 "
            />
            <i className="fa-solid fa-plane text-center text-purple-800"></i>
            <p className="text-xs font-medium text-gray-600">2h 25m(Nonstop)</p>
          </div>

          {/* Line */}
          <div className=" h-1 bg-gray-300 mx-4 hidden md:flex md:w-24 w-full "></div>

          {/* Arrival */}
          <div className="space-y-1 text-gray-700 md:w-fit w-full items-center flex flex-col md:flex-none md:items-start mt-4 md:mt-0">
            <div className="flex items-center text-sm ">
              <i className="fa-solid fa-plane-arrival mr-2"></i>
              <p>Arrival</p>
            </div>
            <p className="text-xl font-semibold">9:55 AM</p>
            <p className="text-sm text-gray-700">Airport: MAD</p>
          </div>
        </div>

        {/* Price */}
        <div>
          <p className="font-bold text-purple-800 text-lg">Price: $200</p>
          <p className="text-gray-700 text-sm font-medium">Round Trip</p>
        </div>
        {/* Book */}
        <div className="items-center justify-center flex absolute right-0 bottom-0 bg-purple-900 lg:w-48 lg:h-20 w-36 h-14  rounded-tl-lg rounded-br-lg cursor-pointer hover:bg-purple-950">
          <p className="text-center text-white font-bold">Book Flight</p>
        </div>
      </div>
      {/* Check */}
      <div className="flex items-center justify-center w-40 h-12 bg-purple-200 rounded-b-xl ">
        <p className="text-purple-800 font-medium underline cursor-pointer">
          Check the details
        </p>
      </div>
    </div>
  );
}

export default FlightCards;
