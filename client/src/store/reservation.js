import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  reservations: null,
  loading: false,
};

const slice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    updateReservations(reservationState, { payload }) {
      reservationState.reservations = payload;
    },
    updateLoading(reservationState, { payload }) {
      reservationState.loading = payload;
    },
  },
});

export const { updateLoading, updateReservations } = slice.actions;

export const getReservationState = createSelector(
  (state) => state,
  ({ reservation }) => reservation
);

export default slice.reducer;
