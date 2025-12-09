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

  // Rutas del sistema que van en el sidebar
  {
    path: SYSTEM_ROUTE.DASHBOARD,
    requiredRoles: [ROLE.MANAGER, ROLE.COORDINATOR],
  },
  {
    path: SYSTEM_ROUTE.MARKETS,
    requiredRoles: [ROLE.MANAGER, ROLE.SUPERVISOR],
  },
  {
    path: SYSTEM_ROUTE.MARKET_SECTORS,
    requiredRoles: [ROLE.SUPERVISOR, ROLE.COORDINATOR],
  },
  {
    path: SYSTEM_ROUTE.MARKET_STALLS,
    requiredRoles: [ROLE.COORDINATOR],
  },
  {
    path: SYSTEM_ROUTE.REPORTES,
    requiredRoles: [ROLE.MANAGER, ROLE.COORDINATOR],
  },
  {
    path: SYSTEM_ROUTE.TARIFAS,
    requiredRoles: [ROLE.MANAGER, ROLE.SUPERVISOR, ROLE.COORDINATOR],
  },
  {
    path: SYSTEM_ROUTE.USERS,
    requiredRoles: [ROLE.MANAGER, ROLE.SUPERVISOR],
  },

  {
    path: SYSTEM_ROUTE.MERCHANTS,
    requiredRoles: [ROLE.COORDINATOR],
  },

  // Rutas protegidas que NO van en el sidebar
  {
    path: SYSTEM_ROUTE.INBOX,
    requiredRoles: [ROLE.COORDINATOR, ROLE.MANAGER], // ajusta según necesidad
  },
  {
    path: SYSTEM_ROUTE.NOTIFICATIONS,
    requiredRoles: [ROLE.COORDINATOR],
  },
  {
    path: SYSTEM_ROUTE.PROFILE,
    requiredRoles: [ROLE.MANAGER, ROLE.SUPERVISOR], // o cualquier rol autenticado si lo dejas sin requiredRoles
  },
  {
    path: SYSTEM_ROUTE.CONFIG,
    requiredRoles: [ROLE.MANAGER],
  },
];
