// lib/api/safe-api.ts

import type { ApiErrorResponse } from "@/core/api";
import { handleApiError, isApiErrorResponse } from "./error-handler";

export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: ApiErrorResponse };

export async function safeApi<T>(fn: () => Promise<T>): Promise<ApiResult<T>> {
  try {
    const data = await fn();
    return { ok: true, data };
  } catch (error: unknown) {
    const apiError = isApiErrorResponse(error) ? error : handleApiError(error); // normaliza a ApiErrorResponse

    return { ok: false, error: apiError };
  }
}
