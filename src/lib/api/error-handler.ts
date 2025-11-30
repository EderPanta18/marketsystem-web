// lib/api/error-handler.ts

import { AxiosError } from "axios";
import { ERROR_CODES, ERROR_MESSAGES, type ERROR_CODE } from "@/core/constants";
import type { ApiErrorResponse } from "@/core/api";

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
      return createGenericError(
        ERROR_CODES.TIMEOUT,
        ERROR_MESSAGES[ERROR_CODES.TIMEOUT]
      );
    }

    if (!response) {
      return createGenericError(
        ERROR_CODES.NETWORK_ERROR,
        ERROR_MESSAGES[ERROR_CODES.NETWORK_ERROR]
      );
    }

    // Errores HTTP
    const { status } = response;
    const errorCode = getGenericErrorCode(status);

    return createGenericError(errorCode, ERROR_MESSAGES[errorCode], status);
  }

  // Error genérico
  return createGenericError(
    ERROR_CODES.INTERNAL_ERROR,
    ERROR_MESSAGES[ERROR_CODES.INTERNAL_ERROR]
  );
}

// Helper para crear errores genéricos
function createGenericError(
  code: string,
  message: string,
  statusCode: number = 500
): ApiErrorResponse {
  return {
    success: false,
    error: "ApiError",
    message,
    statusCode,
    code,
    timestamp: new Date().toISOString(),
    path: window.location.pathname,
  };
}

// Solo códigos genéricos para errores HTTP
function getGenericErrorCode(status: number): ERROR_CODE {
  switch (status) {
    case 400:
      return ERROR_CODES.INVALID_INPUT;
    case 401:
      return ERROR_CODES.UNAUTHORIZED;
    case 403:
      return ERROR_CODES.ACCESS_DENIED;
    case 404:
      return ERROR_CODES.RESOURCE_NOT_FOUND;
    case 422:
      return ERROR_CODES.INVALID_INPUT;
    case 429:
      return ERROR_CODES.RATE_LIMIT_EXCEEDED;
    case 500:
      return ERROR_CODES.INTERNAL_ERROR;
    case 503:
      return ERROR_CODES.SERVICE_UNAVAILABLE;
    default:
      return ERROR_CODES.INTERNAL_ERROR;
  }
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
