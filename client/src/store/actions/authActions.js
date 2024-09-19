import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const register = createAsyncThunk(
  "register",
  async ({ name, email, password }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/register`,
        {
          name: name,
          email: email,
          password: password,
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const login = createAsyncThunk("login", async ({ email, password }) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
      {
        email: email,
        password: password,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
});
