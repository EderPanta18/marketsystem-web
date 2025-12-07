// core/api/endpoints.ts

import { makeEntityEndpoints } from "./endpoints.factory";

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
    ME: "/auth/me",
    REGISTER: "/auth/register",
  },

  MARKETS: makeEntityEndpoints("markets", {
    STATS: "/markets/stats",
    SEARCH: "/markets/search",
  }),

  STALLS: makeEntityEndpoints("stalls", {
    ASSIGN: "/stalls/assign",
    BY_MARKET: (marketId: string | number) => `/stalls/market/${marketId}`,
  }),

  PAYMENTS: makeEntityEndpoints("payments", {
    HISTORY: "/payments/history",
    STATS: "/payments/stats",
    PROCESS: "/payments/process",
  }),
} as const;

export default API_ENDPOINTS;
