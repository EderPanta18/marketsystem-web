// core/config/api.config.ts

import { APP_CONFIG } from "./app.config";

export const API_CONFIG = {
  REAL_BASE_URL: process.env.BACKEND_API_URL || "",

  BASE_URL: APP_CONFIG.IS_DEVELOPMENT
    ? "http://localhost:3000/api/backend"
    : "/api/backend",

  // Tiempos de espera
  TIMEOUT: 30000,

  // Reintentos
  MAX_RETRIES: 3,
} as const;
