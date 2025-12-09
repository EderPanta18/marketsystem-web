// app/(protected)/sistema/layout.tsx

import SidebarNavigation from "./_layout-components/sidebar-navigation/SidebarNavigation";

export default function SystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <SidebarNavigation />
      {children}
    </div>
  );
}
