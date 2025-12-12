// app/(protected)/sistema/(app)/layout.tsx

import SidebarNavigation from "./_layout/sidebar-navigation";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row h-svh">
      <SidebarNavigation />
      <div className="size-full overflow-y-auto pt-14 px-2 py-2 md:px-3 lg:pl-5 lg:pr-4 lg:py-3">
        {children}
      </div>
    </div>
  );
}
