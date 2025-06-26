import axios from "axios";
import type { Store } from "@reduxjs/toolkit";
import { setError } from "@store/fetchStatusSlice";

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const setupInterceptors = (store: Store) => {
  api.interceptors.request.use(
    (config) => {
      console.log(`[REQUEST] ${config.method?.toUpperCase()} ${config.url}`);
      return config;
    },
    (error) => {
      console.error(`[REQUEST ERROR]`, error);
      return Promise.reject("Request failed: " + error.message);
    }
  );

  api.interceptors.response.use(
    (response) => {
      console.log(`[RESPONSE]`, response);
      return response.data;
    },
    (error) => {
      console.error(`[API ERROR]`, error, error.response || error.message);
      store.dispatch(setError(error));
      return Promise.reject(error);
    }
  );
};

export default api;
