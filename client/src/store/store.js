import { combineReducers, configureStore } from "@reduxjs/toolkit";
import flightReducer from "./flight";
import authReducer from "./auth";
import reservationReducer from "./reservation";
import airlineReducer from "./airline";

const rootReducer = combineReducers({
  flight: flightReducer,
  auth: authReducer,
  reservation: reservationReducer,
  airline: airlineReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
