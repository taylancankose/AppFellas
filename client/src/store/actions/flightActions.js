import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getFlights = createAsyncThunk(
  "getFlights",
  async ({ page, fromDateTime, toDateTime }) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/flights/getAll?page=${page}&fromDateTime=${fromDateTime}&toDateTime=${toDateTime}`
      );
      return response.data.lastFlights;
    } catch (error) {
      console.log(error);
    }
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
    return response.data.lastFlights;
  }
);

export const getReservations = createAsyncThunk("getReservations", async () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmVjMzIyMmI4NmE0NjI4ZWFmMTEwYWQiLCJpYXQiOjE3MjY3NTUzNzZ9.WFdN_uOkIIUugRz2Oc8j27fx1u-dWFEQ7s0vLD8tiC0";

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/reservation/my-reservations`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const makeReservation = createAsyncThunk(
  "makeReservation",
  async ({ flightID, price }, { rejectWithValue, getState }) => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmVjMzIyMmI4NmE0NjI4ZWFmMTEwYWQiLCJpYXQiOjE3MjY3NTUzNzZ9.WFdN_uOkIIUugRz2Oc8j27fx1u-dWFEQ7s0vLD8tiC0";

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/reservation/reserve`,
        {
          flightID: flightID,
          price: price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data; // İsteğin sonucunda gelen veriyi döndür
    } catch (error) {
      console.error("Reservation failed:", error);
      // Hata durumunda rejectWithValue ile hatayı handle edin
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);
