// core/api/api.types.ts

// Respuesta exitosa de la API
export interface ApiSuccessResponse<T = any> {
  data: T;
  success: true;
  message?: string;
  timestamp: string;
}

// Respuesta paginada exitosa
export interface PaginatedSuccessResponse<T = any> {
  data: T[];
  meta: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  success: true;
  message?: string;
  timestamp: string;
}

// Respuesta de error de la API
export interface ApiErrorResponse {
  success: false;
  error: string;
  message: string;
  statusCode: number;
  timestamp: string;
  path: string;
  code: string;
  details?: string;
  fieldErrors?: Record<string, string[]>;
}

// Unión de todos los tipos de respuesta
export type ApiResponse<T = any> = ApiSuccessResponse<T> | ApiErrorResponse;
export type PaginatedResponse<T = any> =
  | PaginatedSuccessResponse<T>
  | ApiErrorResponse;
