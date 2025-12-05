// core/constants/role-permissions.ts

import { PERMISSION } from "./permissions";
import { ROLE } from "./roles";

export const ROLE_PERMISSIONS: Record<ROLE, readonly PERMISSION[]> = {
  [ROLE.MANAGER]: [] as const,
  [ROLE.SUPERVISOR]: [] as const,
  [ROLE.COORDINATOR]: [] as const,
  [ROLE.MERCHANT]: [] as const,
  [ROLE.COLLECTOR]: [] as const,
};
