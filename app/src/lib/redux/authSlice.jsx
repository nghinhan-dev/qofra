import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: null, fullName: "" },
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken, fullName } = action.payload;
      state.token = accessToken;
      state.fullName = fullName;
    },
    logOut: (state) => {
      state.token = null;
      state.fullName = "";
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export const selectCurrentToken = (state) => state.auth.token;
export default authSlice.reducer;
