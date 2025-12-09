// ui/organisms/sidebar/Sidebar.tsx

import { cn } from "@/shared/utils";
import { Link } from "@/ui/atoms";
import type { SidebarProps, SidebarNavItem } from "./Sidebar.types";
import { getSidebarClassName, getSidebarItemClasses } from "./Sidebar.helpers";

export const Sidebar: React.FC<SidebarProps> = ({
  header,
  items,
  footer,
  className,
  ...props
}) => {
  const renderItem = (item: SidebarNavItem) => (
    <Link
      key={item.id}
      href={item.href}
      className={getSidebarItemClasses(item)}
      active={item.active}
      disabled={item.disabled}
      fullWidth
      colorScheme="neutral"
      variant="subtle"
      underline="none"
      leftIcon={item.icon}
    >
      <span className="truncate">{item.label}</span>
    </Link>
  );

  return (
    <aside className={cn(getSidebarClassName(), className)} {...props}>
      {header && (
        <div className="px-2 py-3 border-b border-gray-200 ">{header}</div>
      )}

      <nav className="flex-1 py-2">{items.map(renderItem)}</nav>

      {footer && (
        <div className="border-t border-gray-200 px-2 py-3">{footer}</div>
      )}
    </aside>
  );
};

export default Sidebar;
