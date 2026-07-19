export type UserRole = "USER" | "ADMIN";

export interface AuthUser {
  user_id: string;
  email: string;
  role: UserRole;
}

export interface AuthSession extends AuthUser {
  access_token: string;
}

export interface VerifyEmailRequest {
  email: string;
}

export interface SignUpRequest {
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface PasswordResetRequest {
  email: string;
}

export interface ResetPasswordRequest {
  new_password: string;
}

export interface MessageResponse {
  message: string;
}
