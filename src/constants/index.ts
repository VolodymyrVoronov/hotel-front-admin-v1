export const PATHS = {
  DASHBOARD: "/",

  AUTH: "/auth",
  LOGIN: "login",

  ROOMS: "/rooms",
  USERS: "/users",
  REGISTER: "/register",
  SUBSCRIPTIONS: "/subscriptions",
  EMAILS: "/emails",
} as const;

export const ROUTES = {
  DASHBOARD: PATHS.DASHBOARD,

  AUTH: PATHS.AUTH,
  LOGIN: PATHS.LOGIN,

  ROOMS: PATHS.ROOMS,
  USERS: PATHS.USERS,
  REGISTER: PATHS.REGISTER,
  SUBSCRIPTIONS: PATHS.SUBSCRIPTIONS,
  EMAILS: PATHS.EMAILS,
} as const;

export const API_URL = "http://localhost:8080";
