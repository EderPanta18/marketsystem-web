// middleware/utils/redirect.utils.ts

import type { NextRequest } from "next/server";
import { SYSTEM_ROUTE, PUBLIC_ROUTE } from "@/core/constants";

export function loginUrl(req: NextRequest, originalPath: string): URL {
  const url = new URL(PUBLIC_ROUTE.LOGIN, req.url);
  url.searchParams.set("redirect", originalPath);
  return url;
}

export function statusUrl(req: NextRequest, code: string): URL {
  const url = new URL(SYSTEM_ROUTE.STATUS, req.url);
  url.searchParams.set("cod", code);
  return url;
}

export function systemUrl(req: NextRequest): URL {
  return new URL(SYSTEM_ROUTE.ROOT, req.url);
}

export function defaultSessionErrorUrl(req: NextRequest): URL {
  return statusUrl(req, "UNKNOWN_SESSION_ERROR");
}
