import { apiClient } from "./client";
import { AUTH } from "../constants/api";
import type {
  AuthSession,
  LoginRequest,
  MessageResponse,
  PasswordResetRequest,
} from "../types/auth";

export const authApi = {
  requestVerificationLink: (email: string) =>
    apiClient.post<MessageResponse>(AUTH.VERIFY_EMAIL, { email }, { skipAuth: true }),

  // `token` is the value from the emailed link's URL — it authenticates this call
  // in place of a normal session token (see get_verified_user on the backend).
  completeSignup: (token: string, password: string) =>
    apiClient.post<{ message: string; user_id: string; email: string; role: string }>(
      AUTH.SIGNUP,
      { password },
      { tokenOverride: token },
    ),

  login: (payload: LoginRequest) =>
    apiClient.post<AuthSession>(AUTH.LOGIN, payload, { skipAuth: true }),

  requestPasswordReset: (payload: PasswordResetRequest) =>
    apiClient.post<MessageResponse>(AUTH.REQUEST_PASSWORD_RESET, payload, { skipAuth: true }),

  // `token` is the value from the emailed reset link's URL.
  completePasswordReset: (token: string, newPassword: string) =>
    apiClient.post<MessageResponse>(
      AUTH.RESET_PASSWORD,
      { new_password: newPassword },
      { tokenOverride: token },
    ),
};
