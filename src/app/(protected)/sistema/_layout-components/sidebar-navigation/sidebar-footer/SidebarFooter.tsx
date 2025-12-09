"use client";

// app/(protected)/sistema/_layout-components/sidebar-navigation/sidebar-footer/SidebarFooter.tsx

import React from "react";
import { Link, Icon, Button } from "@/ui/atoms";
import { IconButton } from "@/ui/molecules";
import {
  getSidebarFooterClassName,
  sidebarQuickActionsRowClasses,
  userClasses,
  userMenuClasses,
} from "./SidebarFooter.helpers";
import { Profile } from "@/modules/auth";
import { cn } from "@/shared/utils";
import { useAuthorizedRoutes, useLogout } from "@/hooks/auth";
import { useIsActiveRoute } from "@/hooks/ui";
import { SIDEBAR_QUICK_ACTIONS, USER_MENU_ITEMS } from "../config";
import { AuthService } from "@/services/auth";

const QuickActions: React.FC = () => {
  const { accessiblePaths } = useAuthorizedRoutes();
  const allowed = new Set(accessiblePaths);

  const actions = SIDEBAR_QUICK_ACTIONS.filter((action) =>
    allowed.has(action.href)
  );

  if (actions.length === 0) {
    return null;
  }

  return (
    <div className={sidebarQuickActionsRowClasses}>
      {actions.map((action) => {
        const { isActive } = useIsActiveRoute(action.href);
        return (
          <Link
            key={action.id}
            href={action.href}
            active={isActive}
            underline="none"
            variant="subtle"
            className={cn(
              "flex-1 bg-gray-200  border-none py-3 flex items-center justify-center",
              isActive ? "bg-sky-200" : "hover:bg-sky-100"
            )}
            fullWidth
          >
            <Icon name={action.icon} className="size-8" />
          </Link>
        );
      })}
    </div>
  );
};

const UserMenuItems: React.FC = () => {
  const { logout, message } = useLogout();

  const { accessiblePaths } = useAuthorizedRoutes();
  const allowed = new Set(accessiblePaths);

  const navigableItems = USER_MENU_ITEMS.filter(
    (item) => item.href && allowed.has(item.href)
  );

  const logoutItem = USER_MENU_ITEMS.find((item) => item.action === "logout");

  return (
    <div className={userMenuClasses}>
      {navigableItems.map((item) => {
        const { isActive } = useIsActiveRoute(item.href!);

        return (
          <Link
            key={item.id}
            href={item.href!}
            active={isActive}
            underline="none"
            colorScheme="neutral"
            variant="ghost"
            fullWidth
            leftIcon={<Icon name={item.icon} />}
            className={cn(
              "border-none rounded-none py-3",
              isActive ? "bg-sky-200" : "hover:bg-sky-100"
            )}
          >
            <span>{item.label}</span>
          </Link>
        );
      })}

      {logoutItem && (
        <Button
          key={logoutItem.id}
          colorScheme="danger"
          variant="solid"
          fullWidth
          className="border-t rounded-none"
          onClick={() => {
            logout();
          }}
        >
          <Icon name={logoutItem.icon} className="text-white" />
          <span>{logoutItem.label}</span>
        </Button>
      )}
      <p className="text-xs text-red-600 font-thin text-center text-nowrap">
        {message}
      </p>
    </div>
  );
};

const UserMenu: React.FC = () => {
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);

  const handleLogout = async () => {
    await AuthService.logout();
    window.location.reload();
    setUserMenuOpen(false);
  };

  return (
    <div className="relative">
      <div onClick={() => setUserMenuOpen((v) => !v)} className={userClasses}>
        <Profile />
        <IconButton
          icon={userMenuOpen ? "chevron-down" : "chevron-up"}
          size="sm"
          aria-label="Toggle user menu"
        />
      </div>
      {userMenuOpen && <UserMenuItems />}
    </div>
  );
};

export const SidebarFooter: React.FC = () => {
  return (
    <div className={getSidebarFooterClassName()}>
      <QuickActions />
      <UserMenu />
    </div>
  );
};

export default SidebarFooter;
