import API from "./axios";


export const subscribeEmail = async (email) => {
  try {
    const response = await API.post("/subscribe", { email });
    return response.data;
  } catch (error) {
    throw error?.response?.data?.message || "Subscription failed";
  }
};
 
export const getSubscribers = async () => {
  try {
    const res = await API.get("/subscribe"); 
    
     return res.data.data;

  } catch (err) {
    throw err.response?.data?.message || "Failed to fetch subscribers";
  }
};

export const deleteSubscriber = async (id) => {
  try {
    const res = await API.delete(`/subscribe/${id}`); 
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || "Failed to delete subscriber";
  }
};