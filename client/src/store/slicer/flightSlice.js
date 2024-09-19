import { createSlice } from "@reduxjs/toolkit";
import {
  getFlights,
  getFlightsByDirection,
  getReservations,
  makeReservation,
} from "../actions/flightActions";

const flightSlice = createSlice({
  name: "flight",
  initialState: {
    flights: [],
    error: false,
    loading: false,
    reservations: [],
    reservation: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFlights.fulfilled, (state, action) => {
        state.flights = action.payload;
        state.loading = false;
      })
      .addCase(getFlights.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getFlights.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(getFlightsByDirection.fulfilled, (state, action) => {
        state.flights = action.payload;
        state.loading = false;
      })
      .addCase(getFlightsByDirection.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getFlightsByDirection.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(getReservations.fulfilled, (state, action) => {
        state.reservations = action.payload;
        state.loading = false;
      })
      .addCase(getReservations.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getReservations.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(makeReservation.fulfilled, (state, action) => {
        state.reservation = action.payload;
        state.loading = false;
      })
      .addCase(makeReservation.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(makeReservation.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default flightSlice.reducer;
