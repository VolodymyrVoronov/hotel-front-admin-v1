export const PATHS = {
  DASHBOARD: "/",
  AUTH: "/auth",
  LOGIN: "login",
} as const;

export const ROUTES = {
  DASHBOARD: PATHS.DASHBOARD,
  AUTH: PATHS.AUTH,
  LOGIN: PATHS.LOGIN,
} as const;

export const API_URL = "http://localhost:8080";
