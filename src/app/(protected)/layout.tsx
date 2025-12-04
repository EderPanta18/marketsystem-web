// src/app/(protected)/layout.tsx

"use client";

import type { ReactNode } from "react";
import { useSession } from "@/hooks/auth";

interface ProtectedLayoutProps {
  children: ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const { session, status, isAuthenticated, hydrate } = useSession();

  // Loading de sesión (puedes afinar el diseño según tu UI)
  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Cargando sesión...</p>
      </div>
    );
  }

  // Sin sesión válida
  if (!isAuthenticated) {
    const message =
      session?.kind === "unauthenticated" && session.errorMessage
        ? session.errorMessage
        : "No hay una sesión válida.";

    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="space-y-3 text-center">
          <p>{message}</p>
          <button
            type="button"
            onClick={() => hydrate()}
            className="mr-3 text-sm font-medium text-blue-600 underline"
          >
            Reintentar
          </button>
          <a
            href="/auth/login"
            className="text-sm font-medium text-blue-600 underline"
          >
            Ir al inicio de sesión
          </a>
        </div>
      </div>
    );
  }

  // Sesión OK → contenido protegido
  return <>{children}</>;
}
