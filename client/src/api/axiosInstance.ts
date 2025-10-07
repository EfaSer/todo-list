import { useAuthStore } from "@/store/authStore";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      const authStore = useAuthStore.getState();
      authStore.setSessionExpired(true);
      authStore.logout();
    }
    return Promise.reject(error);
  }
);
