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
  STATUS: "/status/estado",
} as const;

/**
 * Rutas restringidas, generalmente de error o estados temporales.
 */
export const RESTRICTED_ROUTE = {
  DELAY: "/sistema/retraso",
  ERROR: "/sistema/error",
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
export type RestrictedRoute =
  (typeof RESTRICTED_ROUTE)[keyof typeof RESTRICTED_ROUTE];
export type PublicRoute = (typeof PUBLIC_ROUTE)[keyof typeof PUBLIC_ROUTE];

// Arrays de utilidad para uso en middleware o validación
export const SYSTEM_PATHS: readonly string[] = Object.values(SYSTEM_ROUTE);
export const RESTRICTED_PATHS: readonly string[] =
  Object.values(RESTRICTED_ROUTE);

/**
 * Todas las rutas protegidas (SYSTEM + RESTRICTED).
 */
export const PROTECTED_PATHS: readonly string[] = [
  ...SYSTEM_PATHS,
  ...RESTRICTED_PATHS,
];

export const PUBLIC_PATHS: readonly string[] = Object.values(PUBLIC_ROUTE);
