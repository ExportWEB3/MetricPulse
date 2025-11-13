import axios from "axios";

export const BASE_URL = import.meta.env.PROD
  ? `${import.meta.env.VITE_BACKENDURL}/api/v1`
  : "/api/v1"; // localhost dev fallback

export const clientURL = import.meta.env.PROD ? "" : "http://localhost:3000";
export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,

  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosBase = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
