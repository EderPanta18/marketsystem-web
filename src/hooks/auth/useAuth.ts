import { useAuthStore } from "@/stores";

export function useAuth() {
  const { user, status } = useAuthStore();

  return {
    user,
    status,
    isAuthenticated: status === "authenticated",
  };
}
