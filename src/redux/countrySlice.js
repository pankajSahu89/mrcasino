import { createSlice } from "@reduxjs/toolkit";

const countrySlice = createSlice({
  name: "country",
  initialState: {
    code: "",
  },
  reducers: {
    setCountryCode(state, action) {
      state.code = action.payload;
    },
  },
});

export const { setCountryCode } = countrySlice.actions;
export default countrySlice.reducer;
