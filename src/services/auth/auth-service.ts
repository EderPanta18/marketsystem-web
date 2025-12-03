// src/services/auth/auth-service.ts

import { apiClient } from "@/lib/api"; // desde lib/api/index.ts
import { API_ENDPOINTS } from "@/core/api"; // desde core/api/endpoints.ts
import type {
  LoginRequestDTO,
  RegisterRequestDTO,
  MeResponseDTO,
} from "@/core/dtos/api";

export class AuthService {
  static async login(payload: LoginRequestDTO): Promise<void> {
    await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, payload);
  }

  static async register(payload: RegisterRequestDTO): Promise<void> {
    await apiClient.post<void>(API_ENDPOINTS.AUTH.REGISTER, payload);
  }

  static async me(): Promise<MeResponseDTO> {
    const response = await apiClient.get<MeResponseDTO>(API_ENDPOINTS.AUTH.ME);
    return response.data;
  }

  static async logout(): Promise<void> {
    await apiClient.post<void>(API_ENDPOINTS.AUTH.LOGOUT);
    // El backend debe limpiar las cookies HttpOnly en la respuesta.
  }

  static async refresh(): Promise<void> {
    // Normalmente no necesitas el body; el backend lee refreshToken de la cookie.
    await apiClient.post<void>(API_ENDPOINTS.AUTH.REFRESH);
  }
}

export default AuthService;
