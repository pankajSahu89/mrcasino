import axios from "axios";

// Create axios instance with base URL
// const API_URL = "http://localhost:4000/api";
const API_URL = "https://mrcasinobackened.onrender.com/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to add auth token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["x-auth-token"] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Casino API calls
export const casinoApi = {
  getAllCasinos: () => api.get("/casinos"),
  getCasinoById: (id) => api.get(`/casinos/${id}`),
  createCasino: (casinoData) => api.post("/casinos", casinoData),
  updateCasino: (id, casinoData) => api.put(`/casinos/${id}`, casinoData),
  deleteCasino: (id) => api.delete(`/casinos/${id}`),
  updateCasinoOrder: (id, newOrder) =>
    api.put(`/casinos/reorder/${id}`, { newOrder }),
  incrementVisits: (id) => api.post(`/casinos/${id}/visit`),
};

// Blog API calls
export const blogApi = {
  getAllBlogs: () => api.get("/blogs"),
  getBlogById: (id) => api.get(`/blogs/${id}`),
  createBlog: (blogData) => api.post("/blogs", blogData),
  updateBlog: (id, blogData) => api.put(`/blogs/${id}`, blogData),
  deleteBlog: (id) => api.delete(`/blogs/${id}`),
};

// Auth API calls
export const authApi = {
  login: (credentials) => api.post("/auth/login", credentials),
  register: (userData) => api.post("/auth/register", userData),
  getCurrentUser: () => api.get("/auth/me"),
  initAdmin: () => api.post("/auth/init-admin"),
};

export const uploadImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    // Add timeout to the request
    const response = await api.post("/upload/image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      timeout: 30000, // 30 seconds timeout
    });

    return response.data;
  } catch (error) {
    // Improved error handling
    if (error.code === "ECONNABORTED") {
      throw new Error("Request timeout. Please try again.");
    }
    throw (
      error.response?.data?.message || error.message || "Failed to upload image"
    );
  }
};

export default api;
