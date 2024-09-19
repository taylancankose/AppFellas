import { createSlice } from "@reduxjs/toolkit";
import { getFlights } from "../actions/flightActions";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    token: "",
    loading: false,
    error: null,
    loggedIn: false,
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
      });
  },
});

export default authSlice.reducer;
