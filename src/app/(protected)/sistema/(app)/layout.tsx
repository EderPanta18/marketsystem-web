// app/(protected)/sistema/(app)/layout.tsx

import SidebarNavigation from "./_layout/sidebar-navigation/SidebarNavigation";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row h-svh">
      <SidebarNavigation />
      {children}
    </div>
  );
}
