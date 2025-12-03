import { AxiosRequestConfig } from "axios";
import {
  API_ENDPOINTS,
  ApiSuccessResponse,
  PaginatedSuccessResponse,
} from "@/core/api";
import { httpClient } from "./api.client";
import { handleApiError } from "./error-handler";

export class ApiService {
  // Acceso a los endpoints definidos en core
  static readonly endpoints = API_ENDPOINTS;

  static async get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiSuccessResponse<T>> {
    try {
      const response = await httpClient.get<ApiSuccessResponse<T>>(url, config);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  static async post<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<ApiSuccessResponse<T>> {
    try {
      const response = await httpClient.post<ApiSuccessResponse<T>>(
        url,
        data,
        config
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  static async put<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<ApiSuccessResponse<T>> {
    try {
      const response = await httpClient.put<ApiSuccessResponse<T>>(
        url,
        data,
        config
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  static async patch<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<ApiSuccessResponse<T>> {
    try {
      const response = await httpClient.patch<ApiSuccessResponse<T>>(
        url,
        data,
        config
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  static async delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiSuccessResponse<T>> {
    try {
      const response = await httpClient.delete<ApiSuccessResponse<T>>(
        url,
        config
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  static async getPaginated<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<PaginatedSuccessResponse<T>> {
    try {
      const response = await httpClient.get<PaginatedSuccessResponse<T>>(
        url,
        config
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  static async upload<T = any>(
    url: string,
    formData: FormData,
    onUploadProgress?: (progressEvent: any) => void
  ): Promise<ApiSuccessResponse<T>> {
    try {
      const response = await httpClient.post<ApiSuccessResponse<T>>(
        url,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress,
        }
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  static async download(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<Blob> {
    try {
      const response = await httpClient.get(url, {
        ...config,
        responseType: "blob",
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }
}

// Exportaciones individuales para compatibilidad
export const api = {
  get: ApiService.get,
  post: ApiService.post,
  put: ApiService.put,
  patch: ApiService.patch,
  delete: ApiService.delete,
  getPaginated: ApiService.getPaginated,
  upload: ApiService.upload,
  download: ApiService.download,
  endpoints: API_ENDPOINTS,
};

export default ApiService;
