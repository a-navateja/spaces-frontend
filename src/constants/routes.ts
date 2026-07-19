export const ROUTES = {
  LOGIN: "/login",
  SIGNUP: "/signup",
  SIGNUP_CONFIRM: "/signup/:token", // link emailed after verify-email
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password/:token", // link emailed after request-password-reset
  SPACES: "/spaces",
  SPACE_DETAIL: "/spaces/:spaceId",
};

export const buildSignupConfirmPath = (token: string) => `/signup/${token}`;
export const buildResetPasswordPath = (token: string) => `/reset-password/${token}`;
export const buildSpaceDetailPath = (spaceId: string) => `/spaces/${spaceId}`;
