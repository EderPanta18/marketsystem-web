// app/(protected)/sistema/_layout-components/sidebar-navigation/config/quick-actions.config.ts

import type { IconName } from "@/ui/atoms/icon";
import { SYSTEM_ROUTE } from "@/core/constants";

export type SidebarQuickActionId = "notifications" | "inbox";

export interface SidebarQuickActionConfig {
  id: SidebarQuickActionId;
  href: string;
  icon: IconName;
}

export const SIDEBAR_QUICK_ACTIONS: readonly SidebarQuickActionConfig[] = [
  {
    id: "notifications",
    href: SYSTEM_ROUTE.NOTIFICATIONS,
    icon: "bell",
  },
  {
    id: "inbox",
    href: SYSTEM_ROUTE.INBOX,
    icon: "send",
  },
];
