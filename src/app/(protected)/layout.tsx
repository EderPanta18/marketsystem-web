// src/app/(protected)/layout.tsx

"use client";

import { useLogout, useSession } from "@/hooks/auth";
import { Button, Link, Spinner } from "@/ui/atoms";
import { PUBLIC_ROUTE } from "@/core/constants";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session, isAuthenticated, hydrate, isHydrating, isLoggingOut } =
    useSession();

  const { logout } = useLogout();

  // Cargando sesión o cerrando sesión
  if (isHydrating || isLoggingOut) {
    return (
      <div className="h-svh grid place-content-center">
        <Spinner
          size="5xl"
          label={isLoggingOut ? "Cerrando sesión..." : "Cargando sesión..."}
        />
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
      <div className="h-svh grid place-content-center px-4 md:px-16 lg:px-32 ">
        <div className="flex flex-col gap-6 items-center">
          <p className="text-3xl font-semibold text-center">{message}</p>
          <div className="flex gap-4 items-center">
            <Button size="lg" loading={isHydrating} onClick={hydrate}>
              Reintentar
            </Button>
            <Link
              onClick={logout}
              size="lg"
              href={PUBLIC_ROUTE.LOGIN}
              colorScheme="neutral"
            >
              Ir al inicio de sesión
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Sesión OK → contenido protegido
  return <>{children}</>;
}
