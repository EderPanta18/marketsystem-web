// src/app/page.tsx

import { redirect } from "next/navigation";
import { PUBLIC_ROUTE } from "@/core/constants";

export default function RootPage() {
  redirect(PUBLIC_ROUTE.LOGIN);
}
