// Mirrors app/utils/routes.py on the backend — should keep in sync.

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export const prefix = "/api/v1/spaces-app";

export const AUTH = {
  VERIFY_EMAIL: `${prefix}/auth/verify-email`,
  SIGNUP: `${prefix}/auth/signup`,
  LOGIN: `${prefix}/auth/login`,
  REQUEST_PASSWORD_RESET: `${prefix}/auth/request-password-reset`,
  RESET_PASSWORD: `${prefix}/auth/reset-password`,
  ALLOW_ENTITY: `${prefix}/auth/allow-entity`,
};

export const SPACES = {
  CREATE: `${prefix}/spaces/create`,
  UPLOAD: (spaceId: string) => `${prefix}/spaces/${spaceId}/upload`,
  ADD_USER: (spaceId: string) => `${prefix}/spaces/${spaceId}/add-user`,
  SEARCH: (spaceId: string, query: string) =>
    `${prefix}/spaces/${spaceId}/search?query=${encodeURIComponent(query)}`,
  ACCESSIBLE: `${prefix}/spaces/accessible`,
};
