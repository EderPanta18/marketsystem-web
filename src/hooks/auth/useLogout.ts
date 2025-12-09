// hooks/auth/useLogout.ts

"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "@/services/auth";
import { PUBLIC_ROUTE } from "@/core/constants";
import { useAuthStore } from "@/stores";

export function useLogout() {
  const router = useRouter();
  const { setLoggingOut } = useAuthStore();
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const logout = useCallback(async () => {
    setLoggingOut();
    setLoading(true);
    setMessage(null);
    const res = await AuthService.logout();
    if (!res.ok) {
      setMessage(res.error.message || "Error al cerrar sesión.");
    } else {
      router.replace(PUBLIC_ROUTE.LOGIN);
    }
    setLoading(false);
  }, [router, setLoggingOut, setMessage, setLoading]);
  return { logout, message, loading };
}
