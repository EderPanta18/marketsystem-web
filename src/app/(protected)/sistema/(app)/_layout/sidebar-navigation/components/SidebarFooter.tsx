// app/(protected)/sistema/_layout-components/sidebar-navigation/components/SidebarFooter.tsx

"use client";

import { useState } from "react";
import { Link, Icon, Button } from "@/ui/atoms";
import { IconButton } from "@/ui/molecules";
import { Profile } from "@/modules/auth";
import { cn } from "@/shared/utils";
import { useAuthorizedRoutes, useLogout } from "@/hooks/auth";
import { useIsActiveRoute } from "@/hooks/ui";
import { useOutsideClick } from "@/shared/hooks";
import { SIDEBAR_QUICK_ACTIONS, USER_MENU_ITEMS } from "../config";

const QuickActionItem: React.FC<{
  action: (typeof SIDEBAR_QUICK_ACTIONS)[number];
}> = ({ action }) => {
  const { isActive } = useIsActiveRoute(action.href);

  return (
    <Link
      href={action.href}
      active={isActive}
      underline="none"
      variant="subtle"
      className={cn(
        "flex-1 bg-gray-200 border-none py-3 flex items-center justify-center rounded-2xl",
        isActive ? "bg-sky-200" : "hover:bg-sky-100"
      )}
      fullWidth
    >
      <Icon name={action.icon} className="size-7" />
    </Link>
  );
};

const QuickActions: React.FC = () => {
  const { accessiblePaths } = useAuthorizedRoutes();
  const allowed = new Set(accessiblePaths);

  const actions = SIDEBAR_QUICK_ACTIONS.filter((action) =>
    allowed.has(action.href)
  );

  if (actions.length === 0) return null;

  return (
    <div className="flex items-center gap-2">
      {actions.map((action) => (
        <QuickActionItem key={action.id} action={action} />
      ))}
    </div>
  );
};

const UserMenuItems: React.FC = () => {
  const { logout, message, loading } = useLogout();
  const { accessiblePaths } = useAuthorizedRoutes();
  const allowed = new Set(accessiblePaths);

  const navigableItems = USER_MENU_ITEMS.filter(
    (item) => item.href && allowed.has(item.href)
  );
  const logoutItem = USER_MENU_ITEMS.find((item) => item.action === "logout");

  return (
    <div className="absolute inset-x-0 bottom-full mb-3 rounded-lg bg-white shadow-lg ring-1 ring-gray-300 overflow-hidden">
      {navigableItems.map((item) => {
        const { isActive } = useIsActiveRoute(item.href!);
        return (
          <Link
            key={item.id}
            href={item.href!}
            active={isActive}
            underline="none"
            colorScheme="neutral"
            variant="subtle"
            fullWidth
            leftIcon={<Icon name={item.icon} className="text-slate-800" />}
            className={cn(
              "border-none rounded-none py-3 px-4 text-base font-medium",
              isActive
                ? "bg-sky-200 text-gray-900"
                : "text-gray-800 hover:bg-sky-100"
            )}
          >
            {item.label}
          </Link>
        );
      })}

      {logoutItem && (
        <Button
          key={logoutItem.id}
          colorScheme="danger"
          variant="solid"
          fullWidth
          className="border-t rounded-none py-2 px-3 text-base"
          loading={loading}
          onClick={logout}
        >
          <Icon name={logoutItem.icon} className="text-white" />
          <span>{logoutItem.label}</span>
        </Button>
      )}

      {message && (
        <p className="text-xs text-red-500 font-thin text-center px-3 py-1 text-nowrap">
          {message}
        </p>
      )}
    </div>
  );
};

const UserMenu: React.FC = () => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const menuRef = useOutsideClick<HTMLDivElement>(
    () => {
      if (userMenuOpen) setUserMenuOpen(false);
    },
    { enabled: userMenuOpen }
  );

  return (
    <div ref={menuRef} className="relative">
      <div
        onClick={() => setUserMenuOpen((open) => !open)}
        className="flex w-full items-center justify-between rounded-2xl bg-gray-200 px-3 py-2 font-medium text-slate-800 select-none"
      >
        <Profile />
        <IconButton
          icon={userMenuOpen ? "chevron-down" : "chevron-up"}
          aria-label="Toggle user menu"
        />
      </div>

      {userMenuOpen && <UserMenuItems />}
    </div>
  );
};

export const SidebarFooter: React.FC = () => {
  return (
    <div className="space-y-3">
      <QuickActions />
      <UserMenu />
    </div>
  );
};

export default SidebarFooter;
