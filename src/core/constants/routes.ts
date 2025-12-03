// core/constants/routes.ts

/**
 * Rutas del sistema que requieren autenticación y/o permisos.
 */
export const SYSTEM_ROUTE = {
  ROOT: "/sistema",
  DASHBOARD: "/sistema/panel",
  MARKETS: "/sistema/mercados",
  REPORTES: "/sistema/reportes",
  TARIFAS: "/sistema/tarifas",
  USERS: "/sistema/usuarios",
  INBOX: "/sistema/bandeja",
  NOTIFICATIONS: "/sistema/notificaciones",
  PROFILE: "/sistema/perfil",
  CONFIG: "/sistema/configuracion",
  STATUS: "/sistema/estado",
} as const;

/**
 * Rutas públicas que no requieren autenticación.
 */
export const PUBLIC_ROUTE = {
  ROOT: "/",
  LOGIN: "/login",
} as const;

/**
 * Tipos de utilidad extraídos de los objetos de constantes.
 */
export type SystemRoute = (typeof SYSTEM_ROUTE)[keyof typeof SYSTEM_ROUTE];
export type PublicRoute = (typeof PUBLIC_ROUTE)[keyof typeof PUBLIC_ROUTE];

// Arrays de utilidad para uso en middleware o validación
export const SYSTEM_PATHS: readonly string[] = Object.values(SYSTEM_ROUTE);

/**
 * Todas las rutas protegidas (SYSTEM + RESTRICTED).
 */
export const PROTECTED_PATHS: readonly string[] = Object.values(SYSTEM_ROUTE);

export const PUBLIC_PATHS: readonly string[] = Object.values(PUBLIC_ROUTE);
