// middleware/utils/token.utils.ts

import type { NextRequest } from "next/server";
import { JWTService } from "@/lib/crypto";
import { SECURITY_CONFIG } from "@/core/config";
import { ROLE } from "@/core/constants";
import type { TokenStatus } from "../types";

export interface TokenPayload {
  sub: string;
  role: ROLE;
  iat: number;
  exp: number;
}

export interface TokenResult {
  status: TokenStatus;
  payload?: TokenPayload;
}

export function getAccessToken(req: NextRequest): string | null {
  return req.cookies.get(SECURITY_CONFIG.COOKIES.ACCESS)?.value ?? null;
}

export function getRefreshToken(req: NextRequest): string | null {
  return req.cookies.get(SECURITY_CONFIG.COOKIES.REFRESH)?.value ?? null;
}

export async function verifyAccessToken(
  token: string
): Promise<TokenPayload | null> {
  const decoded = await JWTService.verifyAndDecodeToken<TokenPayload>(
    token,
    SECURITY_CONFIG.JWT.ACCESS_SECRET
  );

  if (!decoded?.sub || !decoded?.role) return null;
  if (!Object.values(ROLE).includes(decoded.role as ROLE)) return null;

  return decoded;
}

export async function getTokenStatus(req: NextRequest): Promise<TokenResult> {
  const accessToken = getAccessToken(req);
  const refreshToken = getRefreshToken(req);

  if (!accessToken) {
    return { status: "NO_TOKEN" };
  }

  const payload = await verifyAccessToken(accessToken);
  if (payload) {
    return { status: "VALID_TOKEN", payload };
  }

  if (refreshToken) {
    return { status: "EXPIRED_TOKEN" };
  }

  return { status: "INVALID_TOKEN" };
}
