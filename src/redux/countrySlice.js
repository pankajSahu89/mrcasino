import { createSlice } from "@reduxjs/toolkit";

const countrySlice = createSlice({
  name: "country",
  initialState: {
    code: "",
    name: "",
  },
  reducers: {
    setCountryCode(state, action) {
      state.code = action.payload;
      state.name = action.payload; 
    },
  },
});

export const { setCountryCode } = countrySlice.actions;
export default countrySlice.reducer;
