import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReservationCard from "../components/ReservationCard";
import FlightFilter from "../ui/FlightFilter";
import { getAuthState } from "../store/auth";
import { getClient } from "../api/client";
import {
  getReservationState,
  updateLoading,
  updateReservations,
} from "../store/reservation";
import Loading from "../ui/Loading";

function MyFlights() {
  const dispatch = useDispatch();
  const { reservations, loading } = useSelector(getReservationState);
  const { user } = useSelector(getAuthState);

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
      ) : reservations ? (
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
