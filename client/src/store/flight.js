import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  flights: null,
  loading: false,
  page: 0,
  limit: 10,
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
    updatePage(flightState, { payload }) {
      flightState.page = payload;
    },
  },
});

export const { updateLoading, updateFlights, updatePage } = slice.actions;

//  memoized selector to check flightState
export const getFlightState = createSelector(
  (state) => state,
  ({ flight }) => flight
);

export default slice.reducer;
