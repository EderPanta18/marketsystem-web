// core/utils/error-utils.ts

import {
  type ERROR_CODE,
  type ERROR_CATEGORY,
  ERROR_CODES,
  ERROR_MESSAGES,
  AUTH_ERRORS,
  MARKET_ERRORS,
  STALL_ERRORS,
  MERCHANT_ERRORS,
  PAYMENT_ERRORS,
} from "../constants";

/**
 * Utilidades para manejo de errores
 */
export const getErrorCategory = (errorCode: ERROR_CODE): ERROR_CATEGORY => {
  if (errorCode.startsWith("SYS_")) return "SYSTEM";
  if (errorCode.startsWith("NET_")) return "NETWORK";
  if (errorCode.startsWith("VALID_")) return "VALIDATION";
  if (errorCode.startsWith("SEC_")) return "SECURITY";
  if (errorCode.startsWith("FILE_")) return "FILE";
  if (errorCode.startsWith("RES_")) return "RESOURCE";
  if (errorCode.startsWith("AUTH_")) return "AUTH";
  if (errorCode.startsWith("SESS_")) return "SESSION";
  if (errorCode.startsWith("MARKET_")) return "MARKET";
  if (errorCode.startsWith("STALL_")) return "STALL";
  if (errorCode.startsWith("MERCHANT_")) return "MERCHANT";
  if (errorCode.startsWith("PAYMENT_")) return "PAYMENT";
  return "SYSTEM";
};

export const isRecoverableError = (errorCode: ERROR_CODE): boolean => {
  const nonRecoverable = [
    // Errores de sistema
    ERROR_CODES.CONFIGURATION_ERROR,

    // Errores de validación
    ERROR_CODES.INVALID_INPUT,
    ERROR_CODES.INVALID_EMAIL,
    ERROR_CODES.INVALID_PHONE,

    // Errores de archivos
    ERROR_CODES.INVALID_FILE_TYPE,

    // Errores de recursos
    ERROR_CODES.RESOURCE_ALREADY_EXISTS,

    // Errores de autenticación
    AUTH_ERRORS.INSUFFICIENT_PERMISSIONS,
    AUTH_ERRORS.ACCESS_DENIED,

    // Errores de negocio críticos
    MARKET_ERRORS.CANT_DELETE_WITH_STALLS,
    STALL_ERRORS.CANT_REASSIGN,
    MERCHANT_ERRORS.HAS_ACTIVE_STALLS,
    PAYMENT_ERRORS.ALREADY_PROCESSED,
  ] as ERROR_CODE[];

  return !nonRecoverable.includes(errorCode);
};

export const isGlobalErrorCode = (code: string): code is ERROR_CODE => {
  return Object.values(ERROR_CODES).includes(code as ERROR_CODE);
};

export const getErrorMessage = (
  code: ERROR_CODE,
  defaultMessage?: string
): string => {
  return ERROR_MESSAGES[code] || defaultMessage || "Error desconocido";
};

// Funciones específicas por categoría de error

export const isSystemError = (errorCode: ERROR_CODE): boolean => {
  return getErrorCategory(errorCode) === "SYSTEM";
};

export const isNetworkError = (errorCode: ERROR_CODE): boolean => {
  return getErrorCategory(errorCode) === "NETWORK";
};

export const isValidationError = (errorCode: ERROR_CODE): boolean => {
  return getErrorCategory(errorCode) === "VALIDATION";
};

export const isSecurityError = (errorCode: ERROR_CODE): boolean => {
  return getErrorCategory(errorCode) === "SECURITY";
};

export const isFileError = (errorCode: ERROR_CODE): boolean => {
  return getErrorCategory(errorCode) === "FILE";
};

export const isResourceError = (errorCode: ERROR_CODE): boolean => {
  return getErrorCategory(errorCode) === "RESOURCE";
};

export const isAuthError = (errorCode: ERROR_CODE): boolean => {
  return getErrorCategory(errorCode) === "AUTH";
};

export const isSessionError = (errorCode: ERROR_CODE): boolean => {
  return (
    getErrorCategory(errorCode) === "AUTH" && errorCode.startsWith("SESS_")
  );
};

export const isMarketError = (errorCode: ERROR_CODE): boolean => {
  return getErrorCategory(errorCode) === "MARKET";
};

export const isStallError = (errorCode: ERROR_CODE): boolean => {
  return getErrorCategory(errorCode) === "STALL";
};

export const isMerchantError = (errorCode: ERROR_CODE): boolean => {
  return getErrorCategory(errorCode) === "MERCHANT";
};

export const isPaymentError = (errorCode: ERROR_CODE): boolean => {
  return getErrorCategory(errorCode) === "PAYMENT";
};

/**
 * Determina si se debe mostrar un botón de reintento
 */
export const shouldShowRetry = (errorCode: ERROR_CODE): boolean => {
  const nonRetryable = [
    AUTH_ERRORS.INSUFFICIENT_PERMISSIONS,
    AUTH_ERRORS.ACCESS_DENIED,
    MARKET_ERRORS.CANT_DELETE_WITH_STALLS,
    PAYMENT_ERRORS.ALREADY_PROCESSED,
  ] as ERROR_CODE[];

  return !nonRetryable.includes(errorCode);
};

/**
 * Determina si se debe redirigir al login
 */
export const shouldRedirectToLogin = (errorCode: ERROR_CODE): boolean => {
  const loginRedirectErrors = [
    AUTH_ERRORS.UNAUTHORIZED,
    AUTH_ERRORS.TOKEN_EXPIRED,
    AUTH_ERRORS.SESSION_EXPIRED,
    AUTH_ERRORS.TOKEN_INVALID,
  ] as ERROR_CODE[];

  return loginRedirectErrors.includes(errorCode);
};

/**
 * Utilidad para logging de errores con contexto
 */
export const logErrorWithContext = (
  error: unknown,
  context: string,
  additionalInfo?: Record<string, any>
): void => {
  if (process.env.NODE_ENV === "development") {
    console.group(`[${context}] Error Details`);
    console.error("Error:", error);
    if (additionalInfo) {
      console.error("Context:", additionalInfo);
    }

    if (typeof error === "object" && error !== null && "code" in error) {
      const errorCode = error.code as ERROR_CODE;
      console.error("Error Code:", errorCode);
      console.error("Category:", getErrorCategory(errorCode));
      console.error("Recoverable:", isRecoverableError(errorCode));
    }

    console.groupEnd();
  }
};
