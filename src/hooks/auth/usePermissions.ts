// hooks/auth/usePermissions.ts

import { useAuthStore } from "@/stores";
import { hasPermission, hasAnyPermission } from "@/core/utils";
import type { PERMISSION } from "@/core/constants";

export function usePermissions() {
  const identity = useAuthStore((s) => s.user?.identity ?? null);

  const can = (required: PERMISSION | PERMISSION[]) =>
    hasPermission(identity, required);

  const canAny = (required: PERMISSION | PERMISSION[]) =>
    hasAnyPermission(identity, required);

  return {
    role: identity?.role ?? null,
    permissions: identity?.permissions ?? [],
    can,
    canAny,
  };
}
