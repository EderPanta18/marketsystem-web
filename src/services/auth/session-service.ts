// services/auth/session-service.ts

import type { AuthUser } from "@/core/types";
import type { ERROR_CODE } from "@/core/constants";
import { AuthService } from "./auth-service";
import type {
  Session,
  SessionAuthenticated,
  SessionUnauthenticated,
} from "@/core/types";

export class SessionService {
  static async getCurrentSession(): Promise<Session> {
    const result = await AuthService.me();

    if (!result.ok) {
      const { error } = result;
      const unauth: SessionUnauthenticated = {
        kind: "unauthenticated",
        isAuthenticated: false,
        user: null,
        errorCode: error.code as ERROR_CODE,
        errorMessage: error.message,
      };
      return unauth;
    }

    const auth: SessionAuthenticated = {
      kind: "authenticated",
      isAuthenticated: true,
      user: result.data,
    };
    return auth;
  }

  static async getUser(): Promise<AuthUser | null> {
    const session = await this.getCurrentSession();
    return session.kind === "authenticated" ? session.user : null;
  }
}

export default SessionService;
