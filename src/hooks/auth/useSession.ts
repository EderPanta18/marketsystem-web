// hooks/auth/useSession.ts

"use client";

import { useEffect, useState, useCallback } from "react";
import type { Session } from "@/core/types";
import { AuthService, SessionService } from "@/services/auth";
import { useAuthStore } from "@/stores";

export function useSession() {
  const { user, status, setUser, setLoading } = useAuthStore();
  const [session, setSession] = useState<Session | null>(null);

  const hydrate = useCallback(async () => {
    setLoading();

    const s = await SessionService.getCurrentSession();
    setSession(s);

    if (s.kind === "authenticated") {
      setUser(s.user); // status pasa a 'authenticated'
      await AuthService.refresh();
    } else {
      setUser(null); // status pasa a 'unauthenticated'
    }
  }, [setUser, setLoading]);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return {
    session, // Session discriminada (para errorCode/errorMessage si hace falta)
    user, // UserSession desde el store
    status, // SessionStatus desde el store
    isHydrating: status === "loading" || status === "idle",
    isAuthenticated: status === "authenticated",
    hydrate,
  };
}
