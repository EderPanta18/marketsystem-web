// lib/api/api-interceptor.ts

import {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { APP_CONFIG } from "@/core/config";

export function setupHttpInterceptors(http: AxiosInstance) {
  // Interceptor de request
  http.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      config.withCredentials = true;

      // Logging en desarrollo
      if (APP_CONFIG.IS_DEVELOPMENT) {
        console.log(
          `Solicitud de API: ${config.method?.toUpperCase()} ${config.url}`,
          config.data
        );
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  // Interceptor de respuesta (SIMPLIFICADO - solo logging)
  http.interceptors.response.use(
    (response: AxiosResponse) => {
      // Logging exitoso
      if (APP_CONFIG.IS_DEVELOPMENT) {
        console.log(
          `Respuesta de API: ${response.status} ${response.config.url}`,
          response.data
        );
      }
      return response;
    },
    (error) => {
      // Logging del error crudo (sin transformar)
      if (APP_CONFIG.IS_DEVELOPMENT) {
        console.error(
          `Error de API: ${error.code || error.status} ${error.config?.url}`,
          error.response?.data || error.message
        );
      }

      // PASAR EL ERROR SIN MODIFICAR - handleApiError se encargará
      return Promise.reject(error);
    }
  );
}

export default setupHttpInterceptors;
