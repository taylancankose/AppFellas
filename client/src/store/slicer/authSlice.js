import { createSlice } from "@reduxjs/toolkit";
import { login, register } from "../actions/authActions";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    loading: false,
    error: null,
    loggedIn: false,
    token: localStorage.getItem("token") || "", // get token from local storage
  },
  reducers: {
    logout: (state) => {
      state.user = {};
      state.token = "";
      state.loggedIn = false;
      localStorage.removeItem("token"); // remove token when logged out
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(register.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.loggedIn = true;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token); // set token
      })
      .addCase(login.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { logout } = authSlice.actions; // Logout action
export default authSlice.reducer;
