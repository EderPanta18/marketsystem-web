// app/(protected)/sistema/(app)/page.tsx

import { SYSTEM_ROUTE } from "@/core/constants";
import { redirect } from "next/navigation";

export default function AppRootPage() {
  redirect(SYSTEM_ROUTE.DASHBOARD);
}
