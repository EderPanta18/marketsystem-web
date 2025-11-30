// lib/api/error-handler.ts

import { AxiosError } from "axios";
import { APP_CONFIG } from "@/core/config";

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string,
    public originalError?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export class NetworkError extends ApiError {
  constructor(message: string = "Error de conexión") {
    super(message, undefined, "NETWORK_ERROR");
    this.name = "NetworkError";
  }
}

export class TimeoutError extends ApiError {
  constructor(message: string = "Timeout de la solicitud") {
    super(message, undefined, "TIMEOUT_ERROR");
    this.name = "TimeoutError";
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string = "No autorizado") {
    super(message, 401, "UNAUTHORIZED");
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends ApiError {
  constructor(message: string = "Acceso prohibido") {
    super(message, 403, "FORBIDDEN");
    this.name = "ForbiddenError";
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string = "Recurso no encontrado") {
    super(message, 404, "NOT_FOUND");
    this.name = "NotFoundError";
  }
}

export function handleApiError(error: unknown): never {
  // Si ya es un ApiError, simplemente relanzar
  if (error instanceof ApiError) {
    throw error;
  }

  // Manejar errores de Axios
  if (isAxiosError(error)) {
    const { response, code, message } = error;

    // Errores de red y timeout
    if (code === "ECONNABORTED") {
      throw new TimeoutError("La solicitud tardó demasiado tiempo");
    }

    if (code === "NETWORK_ERROR") {
      throw new NetworkError("Error de conexión a internet");
    }

    // Errores HTTP
    if (response) {
      const { status, data } = response;
      const errorData = data as AxiosError;

      // Obtener el mensaje de error de forma segura
      const errorMessage = errorData?.message || message || "Error desconocido";

      switch (status) {
        case 401:
          throw new UnauthorizedError(errorMessage);
        case 403:
          throw new ForbiddenError(errorMessage);
        case 404:
          throw new NotFoundError(errorMessage);
        case 500:
          throw new ApiError(
            "Error interno del servidor",
            status,
            "INTERNAL_ERROR",
            error
          );
        default:
          throw new ApiError(errorMessage, status, `HTTP_${status}`, error);
      }
    }
  }

  // Errores genéricos
  if (error instanceof Error) {
    throw new ApiError(error.message, undefined, "UNKNOWN_ERROR", error);
  }

  // Error completamente desconocido
  throw new ApiError(
    "Error desconocido en la API",
    undefined,
    "UNKNOWN_ERROR",
    error
  );
}

export function isAxiosError(error: unknown): error is AxiosError {
  return (error as AxiosError).isAxiosError === true;
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

export function isNetworkError(error: unknown): error is NetworkError {
  return error instanceof NetworkError;
}

export function isUnauthorizedError(
  error: unknown
): error is UnauthorizedError {
  return error instanceof UnauthorizedError;
}

export function isNotFoundError(error: unknown): error is NotFoundError {
  return error instanceof NotFoundError;
}

// Utilidad para logging de errores
export function logApiError(error: unknown, context?: string): void {
  if (APP_CONFIG.IS_DEVELOPMENT) {
    const prefix = context ? `[${context}]` : "[API]";

    if (isApiError(error)) {
      console.error(`${prefix} API Error:`, {
        name: error.name,
        message: error.message,
        status: error.status,
        code: error.code,
      });
    } else {
      console.error(`${prefix} Unknown Error:`, error);
    }
  }
}
