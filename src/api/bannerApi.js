import API from "../api/axios"; 

export const getBanners = () => API.get("/banner");

export const createBanner = (formData) =>
  API.post("/banner", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const deleteBanner = (id) =>
  API.delete(`/banners/${id}`);