import React, { useEffect, useState } from "react";
import SearchForm from "../ui/SearchForm";
import FlightCards from "../ui/FlightCards";
import CategoryCards from "../ui/CategoryCards";
import Filter from "../ui/Filter";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../ui/Loading";
import { formatDateToISO, getFormattedDate } from "../utils/formatters";
import { getFlightState, updateFlights, updatePage } from "../store/flight";
import client from "../api/client";
import { updateLoading } from "../store/flight";
import {
  updateLoading as updateAirlineLoading,
  updateAirlines,
} from "../store/airline";
import Pagination from "../components/Pagination";

export const getFlights = async (dispatch, filter, page) => {
  dispatch(updateLoading(true));

  try {
    // Base URL
    let url = `/flights/all?page=${page}&fromDateTime=${formatDateToISO(
      filter.fromDateTime
    )}&toDateTime=${formatDateToISO(filter.toDateTime)}`;

    // Only add filter if it's defined and not empty
    if (filter?.direction) {
      url += `&direction=${filter?.direction}`;
    }
    if (filter?.location) {
      url += `&route=${filter?.location}`;
    }

    if (filter?.airline) {
      url += `&airline=${filter?.airline}`;
    }

    console.log(filter);
    console.log(url);

    // Request to the API
    const { data } = await client.get(url);

    // Update flights and page number (if needed)
    dispatch(updateFlights(data?.lastFlights));

    // Handle pagination: update the current page and total pages
    dispatch(updatePage(page));
  } catch (error) {
    console.log("Error fetching flights:", error);
  }

  dispatch(updateLoading(false));
};

function Home() {
  const dispatch = useDispatch();
  const { flights, loading, page } = useSelector(getFlightState);

  const [filter, setFilter] = useState({
    sort: "lowest",
    stops: "",
    airline: "", // Hava yolu şirketi filtresi
    direction: "", // Yön filtresi
    location: "", // city
    fromDateTime: getFormattedDate(),
    toDateTime: getFormattedDate(1),
  });
  const getAirlines = async () => {
    dispatch(updateAirlineLoading(true));
    try {
      const { data } = await client.get(`/airlines/all`);
      dispatch(updateAirlines(data));
    } catch (error) {
      console.log(error);
    }
    dispatch(updateAirlineLoading(false));
  };

  useEffect(() => {
    getFlights(dispatch, filter, page);
    getAirlines();
  }, [page]);
  console.log(flights?.length);
  return (
    <>
      {/* Header */}
      <div className="bg-gray-50 min-h-screen flex flex-col items-center max-w-screen ">
        <div className="flex flex-wrap lg:flex-nowrap items-start justify-between w-full p-4 mt-6 lg:space-x-4">
          {/* Main Section */}
          <section className="lg:w-4/5 w-full order-2 lg:order-1">
            <SearchForm filter={filter} setFilter={setFilter} />
            <div className="flex md:flex-nowrap flex-wrap items-start justify-between">
              <div className="mt-10 md:w-[70%] w-full md:order-1 order-2 ">
                {loading ? (
                  <Loading />
                ) : flights?.length > 0 ? (
                  <FlightCards
                    flights={flights}
                    filter={filter}
                    setFilter={setFilter}
                  />
                ) : (
                  <p>There is no flight available</p>
                )}
              </div>
              <div className="mt-10 md:w-[20%] w-full md:order-2 order-1">
                <Filter filter={filter} setFilter={setFilter} />
              </div>
            </div>
          </section>
          {/* w-full md:w-1/5 flex md:flex-col gap-4 md:gap-0 items-center justify-between order-1 md:order-none */}
          <section className="w-full lg:w-1/5 lg:flex-col flex items-end justify-between order-1 lg:order-2 gap-4 lg:gap-0 mt-4 lg:mt-0">
            <CategoryCards />
          </section>
        </div>
        <Pagination filter={filter} />
      </div>
    </>
  );
}

export default Home;
