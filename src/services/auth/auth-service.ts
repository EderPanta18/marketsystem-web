// src/services/auth/auth-service.ts

import { apiClient } from "@/lib/api";
import { API_ENDPOINTS } from "@/core/api"; // endpoints de core
import type {
  LoginRequestDTO,
  RegisterRequestDTO,
  MeResponseDTO,
  LoginResponseDTO,
} from "@/core/dtos/api";
import type { AuthUser } from "@/core/types";
import { safeApi, type ApiResult } from "@/lib/api";
import { PERMISSION, ROLE } from "@/core/constants";

// Mapper MeResponseDTO -> AuthUser (ajusta campos según tu DTO real)
function mapMeToAuthUser(me: MeResponseDTO): AuthUser {
  return {
    identity: {
      id: me.identity.id,
      role: me.identity.role as ROLE,
      permissions: me.identity.permissions as PERMISSION[],
    },
    profile: {
      id: me.profile.id,
      fullName: me.profile.fullName,
      email: me.profile.email,
    },
  };
}

export class AuthService {
  // LOGIN
  static login(payload: LoginRequestDTO): Promise<ApiResult<LoginResponseDTO>> {
    return safeApi<LoginResponseDTO>(async () => {
      return apiClient.post<LoginResponseDTO>(
        API_ENDPOINTS.AUTH.LOGIN,
        payload
      );
    });
  }

  // REGISTER
  static register(payload: RegisterRequestDTO): Promise<ApiResult<void>> {
    return safeApi<void>(async () => {
      await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, payload);
    });
  }

  // ME
  static me(): Promise<ApiResult<AuthUser>> {
    return safeApi<AuthUser>(async () => {
      const res = await apiClient.get<MeResponseDTO>(API_ENDPOINTS.AUTH.ME);
      return mapMeToAuthUser(res.data);
    });
  }

  // LOGOUT
  static logout(): Promise<ApiResult<void>> {
    return safeApi<void>(async () => {
      await apiClient.delete(API_ENDPOINTS.AUTH.LOGOUT);
    });
  }

  // REFRESH
  static refresh(): Promise<ApiResult<void>> {
    return safeApi<void>(async () => {
      await apiClient.post(API_ENDPOINTS.AUTH.REFRESH);
    });
  }
}

export default AuthService;
