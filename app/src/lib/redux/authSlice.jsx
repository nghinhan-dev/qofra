import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: null, username: "" },
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken, username } = action.payload;
      state.token = accessToken;
      state.username = username;
    },
    logOut: (state) => {
      state.token = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export const selectCurrentToken = (state) => state.auth.token;
export default authSlice.reducer;
