// core/types/auth.types.ts

import { PERMISSION, ROLE } from "../constants";

export interface AuthIdentity {
  id: string;
  role: ROLE;
  permissions: PERMISSION[];
}

export interface UserProfile {
  id: string;
  fullName: string;
  email?: string;
}

export interface AuthUser {
  identity: AuthIdentity;
  profile: UserProfile;
}
