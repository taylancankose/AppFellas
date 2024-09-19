import { configureStore } from "@reduxjs/toolkit";
import flightReducer from "./slicer/flightSlice";
import authReducer from "./slicer/authSlice";

export const store = configureStore({
  reducer: {
    flight: flightReducer,
    auth: authReducer,
  },
});
