// core/dtos/api/auth.dto.ts

export interface LoginRequestDTO {
  username: string;
  password: string;
}

export interface LoginResponseDTO {
  message?: string;
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
