// app/(protected)/sistema/_layout-components/sidebar-navigation/config/navigation.config.ts

import { SYSTEM_ROUTE } from "@/core/constants";
import type { IconName } from "@/ui/atoms/icon";

export type SidebarNavItemId =
  | "dashboard"
  | "markets"
  | "marketSectors"
  | "marketStalls"
  | "reports"
  | "fees"
  | "users";

export type SidebarNavItemConfig = {
  id: SidebarNavItemId;
  label: string;
  href: string;
  icon?: IconName;
};

export const SIDEBAR_NAV_ITEMS: readonly SidebarNavItemConfig[] = [
  {
    id: "dashboard",
    label: "Panel General",
    href: SYSTEM_ROUTE.DASHBOARD,
    icon: "layout-dashboard",
  },
  {
    id: "markets",
    label: "Mercados",
    href: SYSTEM_ROUTE.MARKETS,
    icon: "building-2",
  },
  {
    id: "marketSectors",
    label: "Sectores",
    href: SYSTEM_ROUTE.MARKET_SECTORS,
    icon: "grid-2x2",
  },
  {
    id: "marketStalls",
    label: "Puestos",
    href: SYSTEM_ROUTE.MARKET_STALLS,
    icon: "store",
  },
  {
    id: "reports",
    label: "Reportes",
    href: SYSTEM_ROUTE.REPORTS,
    icon: "bar-chart-2",
  },
  {
    id: "fees",
    label: "Tarifas",
    href: SYSTEM_ROUTE.FEES,
    icon: "receipt",
  },
  {
    id: "users",
    label: "Gestión de Usuarios",
    href: SYSTEM_ROUTE.USERS,
    icon: "users",
  },
];
