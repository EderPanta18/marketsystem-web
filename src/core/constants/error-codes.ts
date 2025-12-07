// core/constants/error-codes.ts

// Errores globales
export const SYSTEM_ERRORS = {
  INTERNAL_ERROR: "SYS_001",
  SERVICE_UNAVAILABLE: "SYS_002",
  MAINTENANCE_MODE: "SYS_003",
  CONFIGURATION_ERROR: "SYS_004",
  BACKEND_TIMEOUT: "SYS_005",
} as const;

export const NETWORK_ERRORS = {
  NETWORK_ERROR: "NET_001",
  TIMEOUT: "NET_002",
  CONNECTION_FAILED: "NET_003",
} as const;

export const VALIDATION_ERRORS = {
  INVALID_INPUT: "VALID_001",
  MISSING_REQUIRED_FIELD: "VALID_002",
  INVALID_EMAIL: "VALID_003",
  INVALID_PHONE: "VALID_004",
  INVALID_DATE: "VALID_005",
  INVALID_AMOUNT: "VALID_006",
  FIELD_TOO_LONG: "VALID_007",
  FIELD_TOO_SHORT: "VALID_008",
} as const;

export const SECURITY_ERRORS = {
  RATE_LIMIT_EXCEEDED: "SEC_001",
  CSRF_TOKEN_INVALID: "SEC_002",
  REQUEST_TOO_LARGE: "SEC_003",
} as const;

export const FILE_ERRORS = {
  FILE_TOO_LARGE: "FILE_001",
  INVALID_FILE_TYPE: "FILE_002",
  UPLOAD_FAILED: "FILE_003",
} as const;

export const RESOURCE_ERRORS = {
  RESOURCE_NOT_FOUND: "RES_001",
  RESOURCE_ALREADY_EXISTS: "RES_002",
  RESOURCE_UNAVAILABLE: "RES_003",
} as const;

// Errores por módulo
export const AUTH_ERRORS = {
  ACCESS_DENIED: "AUTH_001",
  INVALID_CREDENTIALS: "AUTH_002",
  EMAIL_ALREADY_EXISTS: "AUTH_003",
} as const;

export const SESSION_ERRORS = {
  BACKEND_TIMEOUT: "SESS_001",
  SESSION_EXPIRED: "SESS_002",
  SESSION_INVALID: "SESS_003",
  ROLE_MISMATCH: "SESS_004",
} as const;

export const MARKET_ERRORS = {
  MARKET_NOT_FOUND: "MARKET_001",
  MARKET_ALREADY_EXISTS: "MARKET_002",
  INVALID_LOCATION: "MARKET_003",
  INVALID_SCHEDULE: "MARKET_004",
  CANT_DELETE_WITH_STALLS: "MARKET_005",
} as const;

export const STALL_ERRORS = {
  DEFAULT: "STALL_000",
  STALL_NOT_FOUND: "STALL_001",
  STALL_ALREADY_ASSIGNED: "STALL_002",
  INVALID_NUMBER: "STALL_003",
  NOT_AVAILABLE: "STALL_004",
  CANT_REASSIGN: "STALL_005",
} as const;

export const MERCHANT_ERRORS = {
  MERCHANT_NOT_FOUND: "MERCHANT_001",
  ALREADY_REGISTERED: "MERCHANT_002",
  INVALID_DOCUMENT: "MERCHANT_003",
  HAS_ACTIVE_STALLS: "MERCHANT_004",
  PAYMENT_PENDING: "MERCHANT_005",
} as const;

export const PAYMENT_ERRORS = {
  PAYMENT_NOT_FOUND: "PAYMENT_001",
  ALREADY_PROCESSED: "PAYMENT_002",
  INSUFFICIENT_FUNDS: "PAYMENT_003",
  INVALID_AMOUNT: "PAYMENT_004",
  GATEWAY_ERROR: "PAYMENT_005",
} as const;

// Unión de todos los códigos de error
export const ERROR_CODES = {
  ...SYSTEM_ERRORS,
  ...NETWORK_ERRORS,
  ...VALIDATION_ERRORS,
  ...SECURITY_ERRORS,
  ...FILE_ERRORS,
  ...RESOURCE_ERRORS,
  ...AUTH_ERRORS,
  ...SESSION_ERRORS,
  ...MARKET_ERRORS,
  ...STALL_ERRORS,
  ...MERCHANT_ERRORS,
  ...PAYMENT_ERRORS,
} as const;

export type ERROR_CODE = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];

// Mensajes de error por código
export const ERROR_MESSAGES: Record<string, string> = {
  // Sistema
  [SYSTEM_ERRORS.INTERNAL_ERROR]: "Error interno del sistema",
  [SYSTEM_ERRORS.SERVICE_UNAVAILABLE]: "Servicio no disponible",
  [SYSTEM_ERRORS.MAINTENANCE_MODE]: "Sistema en mantenimiento",
  [SYSTEM_ERRORS.CONFIGURATION_ERROR]: "Error de configuración",
  [SYSTEM_ERRORS.BACKEND_TIMEOUT]: "Tiempo de espera del sistema agotado",

  // Red
  [NETWORK_ERRORS.NETWORK_ERROR]: "Error de conexión de red",
  [NETWORK_ERRORS.TIMEOUT]: "Tiempo de espera de la red agotado",
  [NETWORK_ERRORS.CONNECTION_FAILED]: "Fallo al conectar con el servidor",

  // Validación
  [VALIDATION_ERRORS.INVALID_INPUT]: "Datos de entrada inválidos",
  [VALIDATION_ERRORS.MISSING_REQUIRED_FIELD]: "Campo requerido faltante",
  [VALIDATION_ERRORS.INVALID_EMAIL]: "Email inválido",
  [VALIDATION_ERRORS.INVALID_PHONE]: "Número de teléfono inválido",
  [VALIDATION_ERRORS.INVALID_DATE]: "Fecha inválida",
  [VALIDATION_ERRORS.FIELD_TOO_LONG]: "Campo demasiado largo",
  [VALIDATION_ERRORS.FIELD_TOO_SHORT]: "Campo demasiado corto",

  // Seguridad
  [SECURITY_ERRORS.RATE_LIMIT_EXCEEDED]: "Límite de solicitudes excedido",
  [SECURITY_ERRORS.CSRF_TOKEN_INVALID]: "Token de seguridad inválido",
  [SECURITY_ERRORS.REQUEST_TOO_LARGE]: "Solicitud demasiado grande",

  // Archivos
  [FILE_ERRORS.FILE_TOO_LARGE]: "Archivo demasiado grande",
  [FILE_ERRORS.INVALID_FILE_TYPE]: "Tipo de archivo no permitido",
  [FILE_ERRORS.UPLOAD_FAILED]: "Error al subir archivo",

  // Recursos genéricos
  [RESOURCE_ERRORS.RESOURCE_NOT_FOUND]: "Recurso no encontrado",
  [RESOURCE_ERRORS.RESOURCE_ALREADY_EXISTS]: "El recurso ya existe",
  [RESOURCE_ERRORS.RESOURCE_UNAVAILABLE]: "Recurso no disponible",

  // Autenticación
  [AUTH_ERRORS.INVALID_CREDENTIALS]: "Credenciales inválidas",
  [AUTH_ERRORS.ACCESS_DENIED]: "Acceso denegado",
  [AUTH_ERRORS.EMAIL_ALREADY_EXISTS]: "El email ya está registrado",

  // Sesión
  [SESSION_ERRORS.BACKEND_TIMEOUT]:
    "El sistema está procesando su sesión. Por favor, espere.",
  [SESSION_ERRORS.SESSION_EXPIRED]:
    "Su sesión ha expirado. Por favor, inicie sesión nuevamente.",
  [SESSION_ERRORS.SESSION_INVALID]:
    "Sesión inválida. Por favor, inicie sesión nuevamente.",
  [SESSION_ERRORS.ROLE_MISMATCH]:
    "Acceso denegado. Rol de usuario no autorizado",

  // Mercados
  [MARKET_ERRORS.MARKET_NOT_FOUND]: "Mercado no encontrado",
  [MARKET_ERRORS.MARKET_ALREADY_EXISTS]: "Ya existe un mercado con ese nombre",
  [MARKET_ERRORS.INVALID_LOCATION]: "Ubicación del mercado inválida",
  [MARKET_ERRORS.INVALID_SCHEDULE]: "Horario del mercado inválido",
  [MARKET_ERRORS.CANT_DELETE_WITH_STALLS]:
    "No se puede eliminar un mercado con puestos asignados",

  // Puestos
  [STALL_ERRORS.STALL_NOT_FOUND]: "Puesto no encontrado",
  [STALL_ERRORS.STALL_ALREADY_ASSIGNED]: "El puesto ya está asignado",
  [STALL_ERRORS.INVALID_NUMBER]: "Número de puesto inválido",
  [STALL_ERRORS.NOT_AVAILABLE]: "Puesto no disponible",
  [STALL_ERRORS.CANT_REASSIGN]: "No se puede reasignar el puesto",

  // Comerciantes
  [MERCHANT_ERRORS.MERCHANT_NOT_FOUND]: "Comerciante no encontrado",
  [MERCHANT_ERRORS.ALREADY_REGISTERED]: "El comerciante ya está registrado",
  [MERCHANT_ERRORS.INVALID_DOCUMENT]: "Documento de identidad inválido",
  [MERCHANT_ERRORS.HAS_ACTIVE_STALLS]: "El comerciante tiene puestos activos",
  [MERCHANT_ERRORS.PAYMENT_PENDING]: "El comerciante tiene pagos pendientes",

  // Pagos
  [PAYMENT_ERRORS.PAYMENT_NOT_FOUND]: "Pago no encontrado",
  [PAYMENT_ERRORS.ALREADY_PROCESSED]: "El pago ya fue procesado",
  [PAYMENT_ERRORS.INSUFFICIENT_FUNDS]: "Fondos insuficientes",
  [PAYMENT_ERRORS.INVALID_AMOUNT]: "Monto de pago inválido",
  [PAYMENT_ERRORS.GATEWAY_ERROR]: "Error en la pasarela de pago",
};

// Categorías de error
export type ERROR_CATEGORY =
  | "SYSTEM"
  | "NETWORK"
  | "VALIDATION"
  | "SECURITY"
  | "FILE"
  | "RESOURCE"
  | "AUTH"
  | "SESSION"
  | "MARKET"
  | "STALL"
  | "MERCHANT"
  | "PAYMENT";
