// core/config/environment.ts

import { z } from "zod";
import { APP_CONFIG } from "./app.config";
import { API_CONFIG } from "./api.config";
import { SECURITY_CONFIG } from "./security.config";

// Schema de validación
const environmentSchema = z.object({
  // App
  NODE_ENV: z.enum(["development", "production", "test"]),

  // API
  API_BASE_URL: z.string().url(),

  // Security
  JWT_ACCESS_SECRET: z.string().min(1),
});

// Configuración completa exportada
export const ENV_CONFIG = {
  APP: APP_CONFIG,
  API: API_CONFIG,
  SECURITY: SECURITY_CONFIG,
} as const;

// Tipo para la configuración
export type AppConfig = typeof ENV_CONFIG;

// Validación (opcional, para runtime)
export function validateEnvironment() {
  return environmentSchema.parse({
    NODE_ENV: APP_CONFIG.NODE_ENV,
    API_BASE_URL: API_CONFIG.BASE_URL,
    JWT_ACCESS_SECRET: SECURITY_CONFIG.JWT.ACCESS_SECRET,
  });
}

// Exportación principal
export default ENV_CONFIG;
