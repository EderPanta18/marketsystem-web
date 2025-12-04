// core/dtos/api/auth.dto.ts

import { AuthIdentity, UserProfile } from "@/core/types";

export interface LoginRequestDTO {
  email: string;
  password: string;
}

export interface RegisterRequestDTO {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface MeResponseDTO {
  identity: {
    id: string;
    role: string;
    permissions: string[];
  };
  profile: {
    id: string;
    fullName: string;
    email: string;
  };
}
