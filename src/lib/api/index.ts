// lib/api/index.ts

export { default as ApiService, api as apiClient } from "./api";
export { RequestBuilder, RequestUtils } from "./request-builder";

export {
  ApiError,
  NetworkError,
  TimeoutError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  handleApiError,
  isAxiosError,
  isApiError,
  isNetworkError,
  isUnauthorizedError,
  isNotFoundError,
  logApiError,
} from "./error-handler";

export { default } from "./api";
