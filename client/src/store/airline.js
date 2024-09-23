import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  airline: null,
  loading: false,
};

const slice = createSlice({
  name: "airline",
  initialState,
  reducers: {
    updateAirlines(airlineState, { payload }) {
      airlineState.airline = payload;
    },
    updateLoading(airlineState, { payload }) {
      airlineState.loading = payload;
    },
  },
});

export const { updateLoading, updateAirlines } = slice.actions;

export const getAirlineState = createSelector(
  (state) => state,
  ({ airline }) => airline
);

export default slice.reducer;
