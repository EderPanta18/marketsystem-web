// middleware/guards/public.guard.ts

import type { NextRequest } from "next/server";
import type { MiddlewareDecision } from "../types";
import { getTokenStatus } from "../utils/token.utils";
import { handlePublicSession } from "../handlers/session.handler";

/**
 * Lógica completa para rutas públicas:
 * - Resuelve estado de token.
 * - Decide si pasa o redirige usando handlePublicSession.
 */
export async function guardPublicRoute(
  req: NextRequest,
  pathname: string
): Promise<MiddlewareDecision> {
  const { status } = await getTokenStatus(req);

  const url = handlePublicSession(req, pathname, status);
  if (url) {
    return { kind: "redirect", url };
  }

  return { kind: "next" };
}
