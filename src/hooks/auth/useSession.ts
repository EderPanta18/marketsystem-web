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
    console.log("Hydrated session:", s);
    setSession(s);

    if (s.kind !== "authenticated") {
      setUser(null); // status → unauthenticated
      return;
    }

    // sesión válida, intentamos refrescar
    const r = await AuthService.refresh();

    if (!r.ok) {
      setUser(null);
      setSession({
        kind: "unauthenticated",
        errorCode: r.error?.code ?? "REFRESH_FAILED",
        errorMessage: r.error?.message ?? "No se pudo refrescar la sesión.",
      } as Session);
      return;
    }

    // refresh OK → mantenemos usuario
    setUser(s.user);
  }, [setUser, setLoading]);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return {
    session,
    user,
    status,
    isHydrating: status === "loading" || status === "idle",
    isAuthenticated: status === "authenticated",
    isLoggingOut: status === "loggingOut",
    hydrate,
  };
}
