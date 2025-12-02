import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getHomeCasinos, getAllCasinos as apiGetAllCasinos } from "../api/casinos";

export const fetchHomeCasinos = createAsyncThunk(
  "casinos/fetchHomeCasinos",
  async (_, { getState }) => {
    const { homeCasinos } = getState().casinos;

    if (homeCasinos.length > 0) {
      return { cached: true, data: homeCasinos };
    }

    const response = await getHomeCasinos();
    return { cached: false, data: response };
  }
);

export const fetchAllCasinos = createAsyncThunk(
  "casinos/fetchAllCasinos",
  async (_, { getState }) => {
    const { allCasinos } = getState().casinos;

    if (allCasinos.length > 0) {
      return { cached: true, data: allCasinos };
    }

    const response = await apiGetAllCasinos();
    return { cached: false, data: response };
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
      // HOME CASINOS
      .addCase(fetchHomeCasinos.pending, (state) => {
        state.loadingHome = true;
      })
      .addCase(fetchHomeCasinos.fulfilled, (state, action) => {
        state.loadingHome = false;
        if (!action.payload.cached) {
          state.homeCasinos = action.payload.data;
        }
      })
      .addCase(fetchHomeCasinos.rejected, (state, action) => {
        state.loadingHome = false;
        state.error = action.error.message;
      })

      // ALL CASINOS
      .addCase(fetchAllCasinos.pending, (state) => {
        state.loadingAll = true;
      })
      .addCase(fetchAllCasinos.fulfilled, (state, action) => {
        state.loadingAll = false;
        if (!action.payload.cached) {
          state.allCasinos = action.payload.data;
        }
      })
      .addCase(fetchAllCasinos.rejected, (state, action) => {
        state.loadingAll = false;
        state.error = action.error.message;
      });
  },
});

export default casinosSlice.reducer;
