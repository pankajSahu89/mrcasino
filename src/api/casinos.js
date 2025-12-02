import API from "./axios";

export const getHomeCasinos = async () => {
  try {
    const response = await API.get("/casinos/homecasino");
    return response.data;
  } catch (error) {
    if (error.message.includes("ERR_BLOCKED_BY_CLIENT")) {
      throw new Error(
        "Our API request was blocked by your browser extension. Please disable ad blockers for this site."
      );
    }
    throw error.response?.data?.message || "Failed to fetch casinos";
  }
};

export const getAllCasinos = async () => {
  try {
    const response = await API.get("/casinos");
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch all casinos";
  }
};

export const createCasino = async (casinoData) => {
  try {
    const response = await API.post("/casinos", casinoData);
    return response.data;
  } catch (error) {
    throw error.response.data.message || "Failed to create casino";
  }
};

export const updateCasino = async (id, casinoData) => {
  try {
    const response = await API.put(`/casinos/${id}`, casinoData);
    return response.data;
  } catch (error) {
    throw error.response.data.message || "Failed to update casino";
  }
};

export const deleteCasino = async (id) => {
  try {
    const response = await API.delete(`/casinos/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data.message || "Failed to delete casino";
  }
};

export const getCasinoById = async (id) => {
  try {
    const response = await API.get(`/casinos/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data.message || "Failed to fetch casino by id";
  }
};

export const updateCasinoOrder = async (id, newOrder) => {
  try {
    const response = await API.put(`/casinos/reorder/${id}`, { newOrder });
    return response.data;
  } catch (error) {}
};

export const getCasinoBySlug = async (slug) => {
  try {
    // Use the existing Axios instance that already handles base URLs
    const response = await API.get(`/casinos/slug/${slug}`);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    if (error.message.includes("ERR_BLOCKED_BY_CLIENT")) {
      throw new Error("Please disable ad blockers for this site.");
    }
    throw error.response?.data?.message || "Failed to fetch casino";
  }
};
