// lib/api/index.ts

export { default as ApiService, api as apiClient } from "./api";
export { RequestBuilder, RequestUtils } from "./request-builder";

export { handleApiError } from "./error-handler";

export { safeApi, type ApiResult } from "./safe-api";

export { default } from "./api";
