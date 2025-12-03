import { configureStore } from "@reduxjs/toolkit";
import casinosReducer from "./casinosSlice";
import countryReducer from "./countrySlice";

export const store = configureStore({
  reducer: {
    casinos: casinosReducer, // key must match useSelector
    country: countryReducer,

  },
});