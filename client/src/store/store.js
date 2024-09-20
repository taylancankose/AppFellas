import { combineReducers, configureStore } from "@reduxjs/toolkit";
import flightReducer from "./flight";
import authReducer from "./auth";
import reservationReducer from "./reservation";

const rootReducer = combineReducers({
  flight: flightReducer,
  auth: authReducer,
  reservation: reservationReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
