import { ROUTES } from "@/constants";

import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = [
  {
    id: "dashboard",
    name: "Bookings",
    path: ROUTES.DASHBOARD,
  },
  {
    id: "rooms",
    name: "Rooms",
    path: ROUTES.ROOMS,
  },
  {
    id: "users",
    name: "Users",
    path: ROUTES.USERS,
  },
  {
    id: "register",
    name: "Register",
    path: ROUTES.REGISTER,
  },
  {
    id: "subscriptions",
    name: "Subscriptions",
    path: ROUTES.SUBSCRIPTIONS,
  },
  {
    id: "emails",
    name: "Emails",
    path: ROUTES.EMAILS,
  },
] as const;

const Navigation = (): JSX.Element => {
  return (
    <nav>
      <ul>
        {navigationItems.map(({ id, name, path }) => (
          <li key={id}>
            <NavigationItem to={path}>{name}</NavigationItem>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
