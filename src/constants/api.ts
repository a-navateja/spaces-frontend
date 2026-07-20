// Mirrors app/utils/routes.py on the backend — keep in sync.

// Runtime-configured in prod: docker-entrypoint.sh regenerates /env.js from
// the container's env vars at startup, so one built image can be deployed
// to any environment without a rebuild. Falls back to the build-time Vite
// env var for local dev (`npm run dev`), where env.js isn't regenerated.
export const API_BASE_URL =
  window.__ENV__?.VITE_API_BASE_URL || (import.meta.env.VITE_API_BASE_URL as string);

export const prefix = "/api/v1/spaces-api";

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