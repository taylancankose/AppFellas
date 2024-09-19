import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReservations } from "../store/actions/flightActions";
import ReservationCard from "../components/ReservationCard";
import FlightFilter from "../ui/FlightFilter";

function MyFlights() {
  const dispatch = useDispatch();
  const reservations = useSelector((state) => state.flight.reservations);

  useEffect(() => {
    dispatch(getReservations());
  }, [dispatch]);
  console.log(reservations);
  return (
    <div className="bg-gray-50 min-h-screen items-center max-w-screen overflow-x-hidden">
      {/* Filter Part */}
      <FlightFilter />
      <div>
        <div></div>
        {reservations?.reservations?.map((reservation) => {
          return (
            <div className="w-screen" key={reservation._id}>
              <ReservationCard reservation={reservation} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MyFlights;
