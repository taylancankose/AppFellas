import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  flights: null,
  loading: false,
};

const slice = createSlice({
  name: "flight",
  initialState,
  reducers: {
    updateFlights(flightState, { payload }) {
      flightState.flights = payload;
    },
    updateLoading(flightState, { payload }) {
      flightState.loading = payload;
    },
  },
});

export const { updateLoading, updateFlights } = slice.actions;

export const getFlightState = createSelector(
  (state) => state,
  ({ flight }) => flight
);

export default slice.reducer;
