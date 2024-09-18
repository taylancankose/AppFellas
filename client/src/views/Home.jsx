import React, { useState } from "react";
import Header from "../ui/Header";
import SearchForm from "../ui/SearchForm";
import FlightCards from "../ui/FlightCards";
import CategoryCards from "../ui/CategoryCards";
import Filter from "../ui/Filter";

function Home() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center max-w-screen overflow-hidden">
      {/* Header */}
      <Header />
      <div className="flex flex-wrap md:flex-nowrap items-start justify-between w-full p-4 mt-6 space-x-4">
        {/* Main Section */}
        <section className="md:w-4/5 w-full">
          <SearchForm />
          <div className="flex md:flex-nowrap flex-wrap items-start justify-between">
            <div className="mt-10 md:w-[80%] w-full md:order-1 order-2">
              <FlightCards />
            </div>
            <div className="mt-10 md:w-2/12 w-full md:order-2 order-1">
              <Filter />
            </div>
          </div>
        </section>
        <section className="md:w-1/5 md:flex md:flex-col items-end justify-end ">
          <CategoryCards />
        </section>
      </div>
    </div>
  );
}

export default Home;
