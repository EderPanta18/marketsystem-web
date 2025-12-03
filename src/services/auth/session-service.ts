// src/services/auth/session-service.ts

import { AuthUser } from "@/core/types";
import { AuthService } from "./auth-service";
import type { ERROR_CODE } from "@/core/constants";
import { safeApi } from "@/lib/api";

export interface Session {
  user: AuthUser | null;
  isAuthenticated: boolean;
  errorCode?: ERROR_CODE;
  errorMessage?: string;
}

export class SessionService {
  static async getCurrentSession(): Promise<Session> {
    const result = await safeApi(() => AuthService.me());

    if (!result.ok) {
      const { error } = result;
      return {
        user: null,
        isAuthenticated: false,
        errorCode: error.code as ERROR_CODE,
        errorMessage: error.message,
      };
    }

    return {
      user: result.data, // AuthUser
      isAuthenticated: true,
    };
  }

  static async clearSession(): Promise<void> {
    // Aquí no te importa el error, solo intentarlo
    await safeApi(() => AuthService.logout());
  }
}

export default SessionService;
