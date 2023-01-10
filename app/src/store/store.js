import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "./slices/SessionSlice";

export const store = configureStore({
  reducer: {
    session: sessionReducer,
  },
});
