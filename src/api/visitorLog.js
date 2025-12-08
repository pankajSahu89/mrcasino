import API from "./axios";


export const createVisitorLog = async (visitorData) => {
  try {
    const response = await API.post("/visitor-logs", visitorData);
    return response.data;
  } catch (error) {
    throw (
      error?.response?.data?.message ||
      "Failed to save visitor log"
    );
  } 
};

export const getAllVisitorLogs = async () => {
  try {
    const response = await API.get("/visitor-logs");
    return response.data.data;
  } catch (error) {
    throw (
      error?.response?.data?.message ||
      "Failed to fetch visitor logs"
    );
  }
};
