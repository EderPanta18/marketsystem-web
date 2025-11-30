// core/config/security.config.ts

export const SECURITY_CONFIG = {
  JWT: {
    ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || "default_jwt_secret",
    ACCESS_EXPIRES_IN: "15m",
    REFRESH_EXPIRES_IN: "7d",
  },

  COOKIES: {
    ACCESS: "accessToken",
    REFRESH: "refreshToken",
  },
} as const;
