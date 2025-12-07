// core/types/session.types.ts

import type { AuthUser } from "@/core/types";
import type { ERROR_CODE } from "@/core/constants";

export interface SessionAuthenticated {
  kind: "authenticated";
  isAuthenticated: true;
  user: AuthUser;
}

export interface SessionUnauthenticated {
  kind: "unauthenticated";
  isAuthenticated: false;
  user: null;
  errorCode: ERROR_CODE | string;
  errorMessage: string;
}

export type Session = SessionAuthenticated | SessionUnauthenticated;

export type SessionStatus =
  | "idle" // aún no se intentó hidratar
  | "loading" // se está llamando
  | "authenticated" // hay usuario válido en memoria
  | "unauthenticated"; // se sabe que no hay sesión válida

export type UserSession = AuthUser | null;
