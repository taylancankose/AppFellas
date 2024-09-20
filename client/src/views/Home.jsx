import React, { useEffect, useState } from "react";
import SearchForm from "../ui/SearchForm";
import FlightCards from "../ui/FlightCards";
import CategoryCards from "../ui/CategoryCards";
import Filter from "../ui/Filter";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../ui/Loading";
import { formatDateToISO, getFormattedDate } from "../utils/formatters";
import { getFlightState, updateFlights } from "../store/flight";
import client from "../api/client";
import { updateLoading } from "../store/flight";

function Home() {
  const dispatch = useDispatch();
  const { flights, loading } = useSelector(getFlightState);

  const [date, setDate] = useState({
    fromDateTime: getFormattedDate(),
    toDateTime: getFormattedDate(1),
  });

  let page = 1;

  const getFlights = async () => {
    dispatch(updateLoading(true));
    try {
      const { data } = await client.get(
        `/flights/getAll?page=${page}&fromDateTime=${formatDateToISO(
          date.fromDateTime
        )}&toDateTime=${formatDateToISO(date.toDateTime)}`
      );
      dispatch(updateFlights(data.lastFlights));
    } catch (error) {
      console.log(error);
    }
    dispatch(updateLoading(false));
  };

  useEffect(() => {
    getFlights();
  }, [page]);
  return (
    <>
      {/* Header */}
      <div className="bg-gray-50 min-h-screen flex flex-col items-center max-w-screen ">
        <div className="flex flex-wrap lg:flex-nowrap items-start justify-between w-full p-4 mt-6 lg:space-x-4">
          {/* Main Section */}
          <section className="lg:w-4/5 w-full order-2 lg:order-1">
            <SearchForm date={date} setDate={setDate} page={page} />
            <div className="flex md:flex-nowrap flex-wrap items-start justify-between">
              <div className="mt-10 md:w-[70%] w-full md:order-1 order-2 ">
                {loading ? <Loading /> : <FlightCards flights={flights} />}
              </div>
              <div className="mt-10 md:w-[20%] w-full md:order-2 order-1">
                <Filter date={date} page={page} />
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
