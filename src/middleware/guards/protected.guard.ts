// middleware/guards/protected.guard.ts

import type { NextRequest } from "next/server";
import { ROUTE } from "@/core/config";
import { ROLE } from "@/core/constants";
import type { MiddlewareDecision } from "../types";
import { getTokenStatus } from "../utils/token.utils";
import {
  handleProtectedSession,
  handleRoleMismatch,
  handleUnexpectedSession,
} from "../handlers/session.handler";
import { normalizePath } from "@/core/utils";

/**
 * Verifica si el rol del usuario puede acceder a la ruta,
 * usando la config central de ROUTE.
 */
function canAccessRoute(pathname: string, userRole?: ROLE): boolean {
  const normalized = normalizePath(pathname);

  const route = ROUTE.find((r) => r.path === normalized);

  if (!route) return true;
  if (route.public) return true;

  if (!userRole) return false;

  const roles = route.requiredRoles;

  if (roles === undefined) return true;
  if (roles.length === 0) return false;

  return roles.includes(userRole);
}

/**
 * Lógica completa para rutas protegidas:
 * - Resuelve estado de token y payload.
 * - Si token no es válido → handleProtectedSession (login/estado).
 * - Si token es válido → verifica rol con ROUTE.
 *   - Rol no permitido → handleRoleMismatch.
 *   - Rol permitido → next.
 */
export async function guardProtectedRoute(
  req: NextRequest,
  pathname: string
): Promise<MiddlewareDecision> {
  const tokenResult = await getTokenStatus(req);

  if (tokenResult.status !== "VALID_TOKEN" || !tokenResult.payload) {
    const url =
      handleProtectedSession(req, pathname, tokenResult.status) ??
      handleUnexpectedSession(req);

    return { kind: "redirect", url };
  }

  const { role } = tokenResult.payload;
  const allowed = canAccessRoute(pathname, role);

  if (!allowed) {
    const url = handleRoleMismatch(req);
    return { kind: "redirect", url };
  }

  return { kind: "next" };
}
