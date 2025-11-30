// lib/api/http-client.ts

import axios from "axios";
import { API_CONFIG } from "@/core/config";
import { setupHttpInterceptors } from "./api.interceptor";

export const httpClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Configurar interceptores
setupHttpInterceptors(httpClient);

export default httpClient;
