import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(window.localStorage.getItem("APP_SESSION")) ?? null,
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    login: (state, action) => {
      window.localStorage.setItem(
        "APP_SESSION",
        JSON.stringify(action.payload)
      );
      state.user = action.payload;
    },
    logout: (state) => {
      window.localStorage.removeItem("APP_SESSION");
      state.user = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = sessionSlice.actions;

export default sessionSlice.reducer;
