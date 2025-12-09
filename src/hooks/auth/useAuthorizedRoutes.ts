// hooks/auth/useAuthorizedRoutes.ts

import { ROUTE } from "@/core/config";
import { ROLE } from "@/core/constants";
import { normalizePath } from "@/core/utils";
import { useAuth } from "@/hooks/auth";

export function useAuthorizedRoutes() {
  const { user } = useAuth();
  const role = user?.identity.role as ROLE | undefined;

  const accessiblePaths = ROUTE.flatMap((route) => {
    const { path, public: isPublic, requiredRoles } = route;

    if (isPublic) return [normalizePath(path)];

    // rutas protegidas requieren usuario autenticado
    if (!role) return [];

    // requiredRoles === undefined -> cualquier rol autenticado
    if (requiredRoles === undefined) {
      return [normalizePath(path)];
    }

    // requiredRoles === [] -> nadie tiene acceso
    if (requiredRoles.length === 0) {
      return [];
    }

    // lista con roles concretos
    return requiredRoles.includes(role) ? [normalizePath(path)] : [];
  });

  return { accessiblePaths };
}
