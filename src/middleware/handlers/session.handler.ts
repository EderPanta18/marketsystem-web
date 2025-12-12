// middleware/handlers/session.handler.ts

import type { NextRequest } from "next/server";
import type { TokenStatus } from "../types";
import {
  loginUrl,
  statusUrl,
  systemUrl,
  defaultSessionErrorUrl,
} from "../utils/redirect.utils";
import { SESSION_ERRORS } from "@/core/constants/error-codes";

/**
 * Rutas públicas:
 * - VALID_TOKEN   → /sistema
 * - EXPIRED/INVALID → /sistema/estado?cod=SESS_003/004
 * - NO_TOKEN      → acceso normal (null)
 */
export function handlePublicSession(
  req: NextRequest,
  status: TokenStatus
): URL | null {
  if (status === "VALID_TOKEN") {
    // Con sesión no puede ver / ni /login
    return systemUrl(req);
  }

  if (status === "EXPIRED_TOKEN") {
    return statusUrl(req, SESSION_ERRORS.SESSION_EXPIRED);
  }

  if (status === "INVALID_TOKEN") {
    return statusUrl(req, SESSION_ERRORS.SESSION_INVALID);
  }

  // NO_TOKEN → público normal
  return null;
}

/**
 * Rutas protegidas:
 * - NO_TOKEN       → /login?redirect=...
 * - EXPIRED_TOKEN  → /sistema/estado?cod=SESS_003
 * - INVALID_TOKEN  → /sistema/estado?cod=SESS_004
 * - VALID_TOKEN    → no decide aquí (se valida rol después)
 */
export function handleProtectedSession(
  req: NextRequest,
  pathname: string,
  status: TokenStatus
): URL | null {
  if (status === "NO_TOKEN") {
    return loginUrl(req, pathname);
  }

  if (status === "EXPIRED_TOKEN") {
    return statusUrl(req, SESSION_ERRORS.SESSION_EXPIRED);
  }

  if (status === "INVALID_TOKEN") {
    return statusUrl(req, SESSION_ERRORS.SESSION_INVALID);
  }

  // VALID_TOKEN → el guard protegido decide con roles
  return null;
}

/**
 * Rol no autorizado en ruta protegida:
 * - Siempre → /sistema/estado?cod=SESS_005
 */
export function handleRoleMismatch(req: NextRequest): URL {
  return statusUrl(req, SESSION_ERRORS.ROLE_MISMATCH);
}

/**
 * Fallback inesperado
 */
export function handleUnexpectedSession(req: NextRequest): URL {
  return defaultSessionErrorUrl(req);
}
