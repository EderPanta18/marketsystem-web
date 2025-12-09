// hooks/auth/useLogout.ts

"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "@/services/auth";
import { PUBLIC_ROUTE } from "@/core/constants";
import { useAuthStore } from "@/stores";

export function useLogout() {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const [message, setMessage] = React.useState<string | null>(null);

  const logout = React.useCallback(async () => {
    try {
      const res = await AuthService.logout();
      if (!res.ok) {
        setMessage(res.error.message || "Error al cerrar sesión.");
      } else {
        setMessage(null);
      }
    } finally {
      setUser(null); // limpia estado local (status → unauthenticated)
      router.replace(PUBLIC_ROUTE.LOGIN); // o la ruta pública que quieras
    }
  }, [router, setUser]);

  return { logout, message };
}
