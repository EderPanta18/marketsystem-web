// lib/api/error-handler.ts

import { AxiosError } from "axios";
import { ERROR_CODES } from "@/core/constants";
import type { ApiErrorResponse } from "@/core/api";
import { getErrorMessage } from "@/core/utils";

export function handleApiError(error: unknown): ApiErrorResponse {
  // Si ya es ApiErrorResponse, retornar directamente
  if (isApiErrorResponse(error)) {
    return error;
  }

  // Manejar errores de Axios
  if (isAxiosError(error)) {
    const { response, code } = error;

    // Errores de red
    if (code === "ECONNABORTED") {
      return createGenericError(ERROR_CODES.TIMEOUT);
    }

    if (!response) {
      return createGenericError(ERROR_CODES.NETWORK_ERROR);
    }

    if (isApiErrorResponse(response.data)) {
      return response.data as ApiErrorResponse;
    }
  }

  // Error genérico
  return createGenericError(ERROR_CODES.INTERNAL_ERROR);
}

// Helper para crear errores genéricos
function createGenericError(
  code: string,
  statusCode: number = 500
): ApiErrorResponse {
  return {
    success: false,
    error: "ApiError",
    message: getErrorMessage(code),
    statusCode,
    code,
    timestamp: new Date().toISOString(),
    path: window.location.pathname,
  };
}

// Type guards
export function isAxiosError(error: unknown): error is AxiosError {
  return (error as AxiosError).isAxiosError === true;
}

export function isApiErrorResponse(error: unknown): error is ApiErrorResponse {
  return (
    typeof error === "object" &&
    error !== null &&
    "success" in error &&
    error.success === false
  );
}
