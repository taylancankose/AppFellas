import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FlightFilter from "../ui/FlightFilter";
import { getClient } from "../api/client";
import {
  getReservationState,
  updateLoading,
  updateReservations,
} from "../store/reservation";
import Loading from "../ui/Loading";
import ReservationCard from "../components/Cards/ReservationCard";

function MyFlights() {
  const dispatch = useDispatch();
  const { reservations, loading } = useSelector(getReservationState);

  const getReservations = async () => {
    dispatch(updateLoading(true));
    try {
      const client = await getClient();
      const { data } = await client.get("/reservation/my-reservations");
      dispatch(updateReservations(data));
    } catch (error) {
      console.log(error);
    }
    dispatch(updateLoading(false));
  };

  useEffect(() => {
    getReservations();
  }, []);

  return (
    <div className="bg-gray-50 min-h-[92vh] items-center max-w-screen overflow-x-hidden">
      {/* Filter Part */}
      <FlightFilter />
      {loading ? (
        <Loading />
      ) : reservations?.reservations?.length > 0 ? (
        <div>
          <div className="flex items-center justify-between p-6">
            <p>
              Sort by: <span className="font-medium">Recommended</span>
            </p>

            <div className="flex items-center gap-2">
              <i className="fa-solid fa-circle-info text-sky-500"></i>
              <p>Avg Fare: $225</p>
            </div>
          </div>
          {reservations?.reservations?.map((reservation) => {
            return (
              <div className="" key={reservation._id}>
                <ReservationCard reservation={reservation} />
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center mt-10 text-lg font-bold">
          No reservation found
        </p>
      )}
    </div>
  );
}

export default MyFlights;
