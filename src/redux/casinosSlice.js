// src/redux/casinosSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios"; // your existing axios instance

// Fetch homepage casinos
export const fetchHomeCasinos = createAsyncThunk(
  "casinos/fetchHomeCasinos",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/casinos/homecasino");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Fetch all casinos
export const fetchAllCasinos = createAsyncThunk(
  "casinos/fetchAllCasinos",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/casinos");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const casinosSlice = createSlice({
  name: "casinos",
  initialState: {
    homeCasinos: [],
    allCasinos: [],
    loadingHome: false,
    loadingAll: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Home casinos
      .addCase(fetchHomeCasinos.pending, (state) => {
        state.loadingHome = true;
        state.error = null;
      })
      .addCase(fetchHomeCasinos.fulfilled, (state, action) => {
        state.homeCasinos = action.payload;
        state.loadingHome = false;
      })
      .addCase(fetchHomeCasinos.rejected, (state, action) => {
        state.loadingHome = false;
        state.error = action.payload;
      })

      // All casinos
      .addCase(fetchAllCasinos.pending, (state) => {
        state.loadingAll = true;
        state.error = null;
      })
      .addCase(fetchAllCasinos.fulfilled, (state, action) => {
        state.allCasinos = action.payload;
        state.loadingAll = false;
      })
      .addCase(fetchAllCasinos.rejected, (state, action) => {
        state.loadingAll = false;
        state.error = action.payload;
      });
  },
});

export default casinosSlice.reducer;
