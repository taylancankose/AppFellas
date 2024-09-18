import React from "react";
import SearchForm from "../ui/SearchForm";
import FlightCards from "../ui/FlightCards";
import CategoryCards from "../ui/CategoryCards";
import Filter from "../ui/Filter";

function Home() {
  return (
    <>
      {/* Header */}
      <div className="bg-gray-50 min-h-screen flex flex-col items-center max-w-screen ">
        <div className="flex flex-wrap lg:flex-nowrap items-start justify-between w-full p-4 mt-6 lg:space-x-4">
          {/* Main Section */}
          <section className="lg:w-4/5 w-full order-2 lg:order-1">
            <SearchForm />
            <div className="flex md:flex-nowrap flex-wrap items-start justify-between">
              <div className="mt-10 md:w-[70%] w-full md:order-1 order-2">
                <FlightCards />
              </div>
              <div className="mt-10 md:w-[20%] w-full md:order-2 order-1">
                <Filter />
              </div>
            </div>
          </section>
          {/* w-full md:w-1/5 flex md:flex-col gap-4 md:gap-0 items-center justify-between order-1 md:order-none */}
          <section className="w-full lg:w-1/5 lg:flex-col flex items-end justify-between order-1 lg:order-2 gap-4 lg:gap-0 mt-4 lg:mt-0">
            <CategoryCards />
          </section>
        </div>
      </div>
    </>
  );
}

export default Home;
