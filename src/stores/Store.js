import { configureStore } from "@reduxjs/toolkit";
import HomeReducer from "../slices/HomeSlice";

export const store = configureStore({
  reducer: {
    home: HomeReducer,
  },
});
