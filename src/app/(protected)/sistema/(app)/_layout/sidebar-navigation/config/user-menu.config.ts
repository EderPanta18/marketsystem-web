// app/(protected)/sistema/_layout-components/sidebar-navigation/config/user-menu.config.ts

import type { IconName } from "@/ui/atoms/icon";
import { SYSTEM_ROUTE } from "@/core/constants";

export type UserMenuItemId = "profile" | "config" | "logout";

export interface UserMenuItemConfig {
  id: UserMenuItemId;
  label: string;
  icon: IconName;
  href?: string; // solo para rutas
  action?: "logout"; // acciones especiales
}

export const USER_MENU_ITEMS: readonly UserMenuItemConfig[] = [
  {
    id: "profile",
    label: "Perfil",
    icon: "user",
    href: SYSTEM_ROUTE.PROFILE,
  },
  {
    id: "config",
    label: "Configuración",
    icon: "settings",
    href: SYSTEM_ROUTE.CONFIG,
  },
  {
    id: "logout",
    label: "Cerrar sesión",
    icon: "log-out",
    action: "logout",
  },
];
