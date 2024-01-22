import { ROUTES } from "@/constants";
import { NavLink, useLocation } from "react-router-dom";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "../ui/button";

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
  const location = useLocation();

  return (
    <NavigationMenu className={className}>
      <NavigationMenuList>
        {navigationItems.map(({ id, name, path }) => (
          <NavigationMenuItem key={id}>
            <NavLink to={path}>
              <Button
                variant={location.pathname === path ? "default" : "ghost"}
              >
                {name}
              </Button>
            </NavLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navigation;
