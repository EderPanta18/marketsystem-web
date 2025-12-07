// app/(protected)/sistema/page.tsx

import { SYSTEM_ROUTE } from "@/core/constants";
import { redirect } from "next/navigation";

export default function SystemRootPage() {
  redirect(SYSTEM_ROUTE.DASHBOARD);
}
