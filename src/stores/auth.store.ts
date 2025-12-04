// stores/auth.store.ts

import { create } from "zustand";
import type { SessionStatus, UserSession } from "@/core/types";

interface AuthState {
  user: UserSession;
  status: SessionStatus;

  // acciones controladas
  setUser: (user: UserSession) => void;
  setLoading: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  status: "idle",

  setLoading: () => set({ status: "loading" }),

  setUser: (user) =>
    set({
      user,
      status: user ? "authenticated" : "unauthenticated",
    }),
}));
