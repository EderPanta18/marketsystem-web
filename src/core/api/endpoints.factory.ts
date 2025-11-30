// core/api/endpoints.factory.ts

import { API_CONFIG } from "../config";

const BASE = API_CONFIG.BASE_URL;

type Id = string | number;
type ExtraMap = Record<string, string | ((...args: any[]) => string)>;

export const makeEntityEndpoints = (resource: string, extras?: ExtraMap) => {
  const basePath = `${BASE}/${resource}`;

  const core = {
    LIST: `${basePath}`,
    CREATE: `${basePath}`,
    BY_ID: (id: Id) => `${basePath}/${id}`,
    UPDATE: (id: Id) => `${basePath}/${id}`,
    DELETE: (id: Id) => `${basePath}/${id}`,
  } as const;

  if (!extras) return core;

  const normalizedExtras: Record<string, any> = {};
  for (const [k, v] of Object.entries(extras)) {
    if (typeof v === "string") normalizedExtras[k] = v;
    else normalizedExtras[k] = v;
  }

  return {
    ...core,
    ...normalizedExtras,
  } as const;
};

export const build = (path: string) =>
  `${BASE}${path.startsWith("/") ? path : `/${path}`}`;

export default {
  makeEntityEndpoints,
  build,
};
