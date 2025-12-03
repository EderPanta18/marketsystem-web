// middleware/types.ts

import type { ROLE } from "@/core/constants";

export type TokenStatus =
  | "NO_TOKEN"
  | "VALID_TOKEN"
  | "EXPIRED_TOKEN"
  | "INVALID_TOKEN";

export interface AuthUser {
  id: string;
  role: ROLE;
}

export interface AuthResult {
  status: TokenStatus;
  user?: AuthUser;
}

export type MiddlewareDecision =
  | { kind: "next" }
  | { kind: "redirect"; url: URL };
