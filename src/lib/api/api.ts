// lib/api/api.ts

import { AxiosRequestConfig, AxiosResponse } from "axios";
import { API_ENDPOINTS } from "@/core/api";
import { httpClient } from "./api.client";
import { handleApiError } from "./error-handler";

export class ApiService {
  // Acceso a los endpoints definidos en core
  static readonly endpoints = API_ENDPOINTS;

  static async get<T = unknown>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await httpClient.get<T, AxiosResponse<T>>(url, config);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  static async post<T = unknown, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await httpClient.post<T, AxiosResponse<T>, D>(
        url,
        data,
        config
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  static async put<T = unknown, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await httpClient.put<T, AxiosResponse<T>, D>(
        url,
        data,
        config
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  static async patch<T = unknown, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await httpClient.patch<T, AxiosResponse<T>, D>(
        url,
        data,
        config
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  static async delete<T = unknown>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await httpClient.delete<T, AxiosResponse<T>>(
        url,
        config
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  static async upload<T = unknown>(
    url: string,
    formData: FormData,
    onUploadProgress?: (progressEvent: any) => void
  ): Promise<T> {
    try {
      const response = await httpClient.post<T>(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress,
      });
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
  upload: ApiService.upload,
  download: ApiService.download,
  endpoints: API_ENDPOINTS,
};

export default ApiService;
