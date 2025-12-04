// hooks/auth/useUserProfile.ts

import { useAuthStore } from "@/stores";

export function useUserProfile() {
  const profile = useAuthStore((s) => s.user?.profile ?? null);

  return {
    profile,
    hasProfile: !!profile,
  };
}
