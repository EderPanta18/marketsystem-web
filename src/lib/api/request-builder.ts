// lib/api/request-builder.ts

import { AxiosRequestConfig } from "axios";
import { APP_CONFIG, API_CONFIG } from "@/core/config";

export interface RequestConfig extends AxiosRequestConfig {}

export class RequestBuilder {
  private config: RequestConfig = {};

  constructor(baseURL?: string) {
    this.config.baseURL = baseURL || API_CONFIG.BASE_URL;
  }

  // Métodos para configurar la request
  method(method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"): this {
    this.config.method = method;
    return this;
  }

  url(url: string): this {
    this.config.url = url;
    return this;
  }

  data(data: any): this {
    this.config.data = data;
    return this;
  }

  params(params: Record<string, any>): this {
    this.config.params = params;
    return this;
  }

  headers(headers: Record<string, string>): this {
    this.config.headers = { ...this.config.headers, ...headers };
    return this;
  }

  timeout(ms: number): this {
    this.config.timeout = ms;
    return this;
  }

  // Headers comunes
  json(): this {
    return this.headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    });
  }

  formData(): this {
    return this.headers({
      "Content-Type": "multipart/form-data",
    });
  }

  // Para requests sin autenticación (si es necesario)
  withoutAuth(): this {
    this.config.withCredentials = false;
    return this;
  }

  // Builders para métodos específicos
  static get(url: string): RequestBuilder {
    return new RequestBuilder().method("GET").url(url).json();
  }

  static post(url: string): RequestBuilder {
    return new RequestBuilder().method("POST").url(url).json();
  }

  static put(url: string): RequestBuilder {
    return new RequestBuilder().method("PUT").url(url).json();
  }

  static patch(url: string): RequestBuilder {
    return new RequestBuilder().method("PATCH").url(url).json();
  }

  static delete(url: string): RequestBuilder {
    return new RequestBuilder().method("DELETE").url(url).json();
  }

  // Builders para tipos de contenido
  static upload(url: string): RequestBuilder {
    return new RequestBuilder().method("POST").url(url).formData();
  }

  // Finalizar y obtener la configuración
  build(): RequestConfig {
    // Configuración por defecto
    const defaultConfig: RequestConfig = {
      timeout: API_CONFIG.TIMEOUT,

      withCredentials: true,
    };

    // Logging en desarrollo
    if (APP_CONFIG.IS_DEVELOPMENT) {
      console.log("Configuración de RequestBuilder:", this.config);
    }

    return { ...defaultConfig, ...this.config };
  }
}

// Utilidades para requests comunes
export const RequestUtils = {
  // Paginación
  paginate(page: number = 1, limit: number = 10) {
    return {
      page,
      limit,
      offset: (page - 1) * limit,
    };
  },

  // Filtros
  filters(filters: Record<string, any>) {
    return { filters };
  },

  // Ordenamiento
  sort(field: string, order: "asc" | "desc" = "asc") {
    return { sort: `${field}:${order}` };
  },

  // Búsqueda
  search(query: string, fields: string[] = ["name"]) {
    return { search: query, searchFields: fields.join(",") };
  },

  // Selección de campos
  fields(fields: string[]) {
    return { fields: fields.join(",") };
  },
};

export default RequestBuilder;
