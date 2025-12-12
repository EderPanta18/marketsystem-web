// app/(protected)/sistema/(status)/estado/page.tsx

"use client";

import { useSearchParams } from "next/navigation";
import { getErrorMessage } from "@/core/utils";
import { useLogout } from "@/hooks/auth";
import { Button, Link } from "@/ui/atoms";
import { SESSION_ERRORS, SYSTEM_ROUTE } from "@/core/constants";

export default function StatusPage() {
  const params = useSearchParams();
  const rawCode = params.get("cod");
  const code = rawCode ?? "SIN_CODIGO";

  console.log("Status code:", code);

  const { logout, loading, message } = useLogout();

  return (
    <div className="h-svh grid place-content-center px-4 md:px-16 lg:px-32 py-8">
      <div className="space-y-2 text-center font-mono">
        <p className="font-extrabold text-6xl text-red-800">ERROR</p>
        <p className="font-semibold text-4xl">
          {getErrorMessage(code, "Error de sesión desconocido.")}
        </p>
      </div>

      <div className="flex items-center justify-center mt-6 gap-4">
        <Button
          onClick={logout}
          loading={loading}
          colorScheme="warning"
          className="text-xl"
        >
          Cerrar sesión
        </Button>
        {code === SESSION_ERRORS.ROLE_MISMATCH && (
          <Link size="lg" variant="subtle" href={SYSTEM_ROUTE.DASHBOARD}>
            Volver al inicio
          </Link>
        )}
      </div>
      <p className="text-center mt-4 text-lg">{message}</p>
    </div>
  );
}
