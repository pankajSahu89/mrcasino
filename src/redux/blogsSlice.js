import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBlogs } from "../api/blogs";

// Fetch Blogs
export const fetchBlogs = createAsyncThunk(
  "blogs/fetchBlogs",
  async (_, { getState }) => {
    const { blogs } = getState().blogs;

    // Cache check
    if (blogs.length > 0) {
      return { cached: true, data: blogs };
    }

    const response = await getBlogs();
    return { cached: false, data: response };
  }
);

const blogsSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        if (!action.payload.cached) {
          state.blogs = action.payload.data;
        }
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default blogsSlice.reducer;
