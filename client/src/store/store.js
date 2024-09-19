import { configureStore } from "@reduxjs/toolkit";
import flightReducer from "./slicer/flightSlice";

export const store = configureStore({
  reducer: {
    flight: flightReducer,
  },
});
