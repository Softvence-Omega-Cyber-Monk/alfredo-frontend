import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // or your backend URL
});

export const sendExchangeRequest = async (payload: any) => {
  const token = localStorage.getItem("token");
  return await API.post("/exchange-request", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
