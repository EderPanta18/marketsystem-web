// core/config/api.config.ts

import { APP_CONFIG } from "./app.config";

export const API_CONFIG = {
  BASE_URL: APP_CONFIG.IS_DEVELOPMENT
    ? "http://localhost:3000/api/backend"
    : "/api/backend",

  // Tiempos de espera
  TIMEOUT: 30000,

  // Reintentos
  MAX_RETRIES: 3,
} as const;
