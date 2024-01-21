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

interface INavigationProps {
  className?: string;
}

const Navigation = ({ className }: INavigationProps): JSX.Element => {
  return (
    <nav className={className}>
      <ul className="grid grid-cols-2 md:grid-cols-1">
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
