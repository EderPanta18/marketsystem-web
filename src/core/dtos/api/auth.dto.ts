// core/dtos/api/auth.dto.ts

import { AuthIdentity, UserProfile } from "@/core/types";

export interface LoginRequestDTO {
  email: string;
  password: string;
  remember?: boolean;
}

export interface MeResponseDTO {
  identity: AuthIdentity;
  profile: UserProfile;
}
