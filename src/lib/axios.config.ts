import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { useSessionStore } from "../store";
import { SnackbarManager } from "../utils";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const axiosConfig = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
});

axiosConfig.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = useSessionStore.getState().token;
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosConfig.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    const errorMessage = error.code == "ERR_NETWORK" ? "Error de conexión" : error.response?.data.error;
    SnackbarManager.error(errorMessage);
    return Promise.reject(error);
  }
);
export default axiosConfig;
