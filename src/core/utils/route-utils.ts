// core/utils/route-utils.ts

import {
  PROTECTED_PATHS,
  RESTRICTED_PATHS,
  SYSTEM_PATHS,
  PUBLIC_PATHS,
} from "../constants";

/**
 * Verifica si un path es una ruta pública.
 * @param path Ruta a verificar.
 */
export const isPublicPath = (path: string): boolean => {
  return PUBLIC_PATHS.includes(path);
};

/**
 * Verifica si un path es una ruta protegida (System o Restricted).
 * @param path Ruta a verificar.
 */
export const isProtectedPath = (path: string): boolean => {
  return PROTECTED_PATHS.includes(path);
};

/**
 * Verifica si un path es una ruta del sistema principal.
 * @param path Ruta a verificar.
 */
export const isSystemPath = (path: string): boolean => {
  return SYSTEM_PATHS.includes(path);
};

/**
 * Verifica si un path es una ruta restringida (ej: errores).
 * @param path Ruta a verificar.
 */
export const isRestrictedPath = (path: string): boolean => {
  return RESTRICTED_PATHS.includes(path);
};

/**
 * Verifica si el path corresponde a alguna ruta conocida (pública o protegida).
 * @param path Ruta a verificar.
 */
export const isPath = (path: string): boolean => {
  return isPublicPath(path) || isProtectedPath(path);
};
