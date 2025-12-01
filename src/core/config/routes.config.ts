// core/config/routes.config.ts

import { PUBLIC_ROUTE, ROLE, SYSTEM_ROUTE } from "../constants";

interface RouteConfig {
  path: string;
  public?: boolean;
  requiredRoles?: readonly ROLE[];
}

export const ROUTE: RouteConfig[] = [
  // Rutas públicas
  { path: PUBLIC_ROUTE.ROOT, public: true },
  { path: PUBLIC_ROUTE.LOGIN, public: true },
  // Rutas del sistema con roles requeridos
  {
    path: SYSTEM_ROUTE.DASHBOARD,
    requiredRoles: [ROLE.MANAGER, ROLE.MANAGER],
  },
  {
    path: SYSTEM_ROUTE.MARKETS,
    requiredRoles: [ROLE.MANAGER, ROLE.SUPERVISOR],
  },
  {
    path: SYSTEM_ROUTE.REPORTES,
    requiredRoles: [ROLE.MANAGER, ROLE.SUPERVISOR],
  },
  {
    path: SYSTEM_ROUTE.TARIFAS,
    requiredRoles: [ROLE.MANAGER, ROLE.SUPERVISOR],
  },
  {
    path: SYSTEM_ROUTE.USERS,
    requiredRoles: [ROLE.MANAGER],
  },

  // Rutas que requieren autenticación pero cualquier rol
  { path: SYSTEM_ROUTE.INBOX, requiredRoles: [] },
  { path: SYSTEM_ROUTE.NOTIFICATIONS, requiredRoles: [] },
  { path: SYSTEM_ROUTE.PROFILE, requiredRoles: [] },
  { path: SYSTEM_ROUTE.CONFIG, requiredRoles: [] },
];
