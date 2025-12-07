// src/app/(protected)/layout.tsx

"use client";

import type { ReactNode } from "react";
import { useSession } from "@/hooks/auth";
import { Spinner } from "@/ui/atoms";

interface ProtectedLayoutProps {
  children: ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const { session, isAuthenticated, hydrate, isHydrating } = useSession();

  // Loading de sesión (puedes afinar el diseño según tu UI)
  if (isHydrating) {
    return (
      <div className="min-h-screen flex place-content-center">
        <Spinner size="5xl" label="Cargando sesión..." />
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
