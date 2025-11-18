import axios from "axios";

export const BASE_URL = import.meta.env.PROD
  ? import.meta.env.VITE_BACKENDURL 
    ? `${import.meta.env.VITE_BACKENDURL}/api/v1`
    : "http://localhost:5000/api/v1"
  : "/api/v1"; // localhost dev fallback

export const clientURL = import.meta.env.PROD ? "" : "http://localhost:3000";
export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to handle FormData
axiosPrivate.interceptors.request.use(
  (config) => {
    // If data is FormData, remove Content-Type header to let browser set it with boundary
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const axiosBase = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
