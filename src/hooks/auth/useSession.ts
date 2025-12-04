// hooks/auth/useSession.ts

import { useEffect, useState, useCallback } from "react";
import type { Session } from "@/core/types";
import { SessionService } from "@/services/auth";
import { useAuthStore } from "@/stores";

export function useSession() {
  const { user, status, setUser, setLoading } = useAuthStore();
  const [session, setSession] = useState<Session>({
    kind: "loading",
    isAuthenticated: false,
    user: null,
  });
  const [isHydrating, setIsHydrating] = useState(false);

  const hydrate = useCallback(async () => {
    setIsHydrating(true);
    setLoading();

    const s = await SessionService.getCurrentSession();
    setSession(s);

    if (s.kind === "authenticated") {
      setUser(s.user); // status pasa a 'authenticated'
    } else {
      setUser(null); // status pasa a 'unauthenticated'
    }

    setIsHydrating(false);
  }, [setUser, setLoading]);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return {
    session, // Session discriminada (para errorCode/errorMessage si hace falta)
    user, // UserSession desde el store
    status, // SessionStatus desde el store
    isAuthenticated: status === "authenticated",
    isHydrating,
    hydrate,
  };
}
