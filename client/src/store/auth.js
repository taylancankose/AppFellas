import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
  loggedIn: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUser(authState, { payload }) {
      authState.user = payload;
    },
    updateLoggedIn(authState, { payload }) {
      authState.loggedIn = payload;
    },
    updateLoading(authState, { payload }) {
      authState.loading = payload;
    },
  },
});

export const { updateLoading, updateUser, updateLoggedIn } = slice.actions;

//  memoized selector to check authstate
export const getAuthState = createSelector(
  (state) => state,
  ({ auth }) => auth
);

export default slice.reducer;
