// core/api/endpoints.ts

import { API_CONFIG } from "../config";
import { makeEntityEndpoints } from "./endpoints.factory";

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_CONFIG.BASE_URL}/auth/login`,
    LOGOUT: `${API_CONFIG.BASE_URL}/auth/logout`,
    REFRESH: `${API_CONFIG.BASE_URL}/auth/refresh`,
    ME: `${API_CONFIG.BASE_URL}/auth/me`,
    REGISTER: `${API_CONFIG.BASE_URL}/auth/register`,
  },

  MARKETS: makeEntityEndpoints("markets", {
    STATS: `${API_CONFIG.BASE_URL}/markets/stats`,
    SEARCH: `${API_CONFIG.BASE_URL}/markets/search`,
  }),

  STALLS: makeEntityEndpoints("stalls", {
    ASSIGN: `${API_CONFIG.BASE_URL}/stalls/assign`,
    BY_MARKET: (marketId: string | number) =>
      `${API_CONFIG.BASE_URL}/stalls/market/${marketId}`,
  }),

  PAYMENTS: makeEntityEndpoints("payments", {
    HISTORY: `${API_CONFIG.BASE_URL}/payments/history`,
    STATS: `${API_CONFIG.BASE_URL}/payments/stats`,
    PROCESS: `${API_CONFIG.BASE_URL}/payments/process`,
  }),
} as const;

export default API_ENDPOINTS;
