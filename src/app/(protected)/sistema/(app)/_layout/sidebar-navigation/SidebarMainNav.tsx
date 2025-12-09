// SidebarMainNav.tsx

"use client";

import { Icon, Link } from "@/ui/atoms";
import { useIsActiveRoute } from "@/hooks/ui";
import { useAuthorizedRoutes } from "@/hooks/auth";
import { SIDEBAR_NAV_ITEMS } from "./config";

export const SidebarMainNav: React.FC = () => {
  const { accessiblePaths } = useAuthorizedRoutes();
  const allowed = new Set(accessiblePaths);

  const items = SIDEBAR_NAV_ITEMS.filter((item) => allowed.has(item.href));

  if (items.length === 0) return null;

  return (
    <nav className="flex-1 py-2 space-y-1">
      {items.map((item) => {
        const { isActive } = useIsActiveRoute(item.href);

        return (
          <Link
            key={item.id}
            href={item.href}
            active={isActive}
            underline="none"
            colorScheme="neutral"
            variant="subtle"
            fullWidth
            leftIcon={
              item.icon ? (
                <Icon name={item.icon} className="text-slate-800" />
              ) : undefined
            }
            className={[
              "flex items-center gap-3 border-none rounded-none pl-6 pr-3 py-3 text-base font-medium",
              isActive
                ? "bg-sky-200 text-gray-900"
                : "text-gray-800 hover:bg-sky-100",
            ].join(" ")}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};

export default SidebarMainNav;
