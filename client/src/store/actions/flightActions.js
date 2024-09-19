import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getFlights = createAsyncThunk(
  "getFlights",
  async ({ page, from, to }) => {
    const response = await axios.get(
      `${
        import.meta.env.VITE_API_BASE_URL
      }/flights/getAll?page=${page}&fromDateTime=${from}&toDateTime=${to}`
    );
    const data = await response.data;
    return data;
  }
);

export const getFlightsByDirection = createAsyncThunk(
  "getFlightsByDirection",
  async ({ direction, page, from, to }) => {
    const response = await axios.get(
      `${
        import.meta.env.VITE_API_BASE_URL
      }/flights/get-by-direction?direction=${direction}&page=${page}&fromDateTime=${from}&toDateTime=${to}`
    );
    return response.data;
  }
);
