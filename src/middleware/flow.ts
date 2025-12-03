// middleware/index.ts

import type { NextRequest } from "next/server";
import type { MiddlewareDecision } from "./types";
import { SYSTEM_ROUTE } from "@/core/constants";
import { isPublicPath, isProtectedPath, isSystemPath } from "@/core/utils";
import { guardPublicRoute } from "./guards/public.guard";
import { guardProtectedRoute } from "./guards/protected.guard";

export async function decideMiddleware(
  req: NextRequest
): Promise<MiddlewareDecision> {
  const pathname = req.nextUrl.pathname;

  // Evitar loops en la página de estado
  if (pathname === SYSTEM_ROUTE.STATUS) {
    return { kind: "next" };
  }

  const isPublic = isPublicPath(pathname);
  const isProtected = isProtectedPath(pathname);
  const isSystem = isSystemPath(pathname);

  if (isPublic) {
    return guardPublicRoute(req, pathname);
  }

  if (isProtected || isSystem) {
    return guardProtectedRoute(req, pathname);
  }

  // Rutas que no están en tu tabla de paths → no se tocan
  return { kind: "next" };
}
