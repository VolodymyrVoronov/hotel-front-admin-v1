import { ROUTES, USER_ROLE } from "@/constants";
import { NavLink, useLocation } from "react-router-dom";
import { useHookstate } from "@hookstate/core";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "../ui/button";
import globalState, { IGlobalState } from "@/state/state";

const navigationItems = [
  {
    id: "dashboard",
    name: "Bookings",
    path: ROUTES.DASHBOARD,
    onlyAdmin: false,
  },
  {
    id: "rooms",
    name: "Rooms",
    path: ROUTES.ROOMS,
    onlyAdmin: false,
  },
  {
    id: "users",
    name: "Users",
    path: ROUTES.USERS,
    onlyAdmin: true,
  },
  {
    id: "register",
    name: "Register",
    path: ROUTES.REGISTER,
    onlyAdmin: true,
  },
  {
    id: "subscriptions",
    name: "Subscriptions",
    path: ROUTES.SUBSCRIPTIONS,
    onlyAdmin: false,
  },
  {
    id: "emails",
    name: "Emails",
    path: ROUTES.EMAILS,
    onlyAdmin: false,
  },
] as const;

interface INavigationProps {
  className?: string;
}

const Navigation = ({ className }: INavigationProps): JSX.Element => {
  const location = useLocation();

  const { userData } = useHookstate<IGlobalState>(globalState).get();

  return (
    <NavigationMenu className={className}>
      <NavigationMenuList>
        {navigationItems.map(({ id, name, path, onlyAdmin }) => {
          if (
            (userData?.role === USER_ROLE.MANAGER ||
              userData?.role === USER_ROLE.USER) &&
            !onlyAdmin
          ) {
            return (
              <NavigationMenuItem key={id}>
                <NavLink to={path}>
                  <Button
                    variant={location.pathname === path ? "default" : "ghost"}
                  >
                    {name}
                  </Button>
                </NavLink>
              </NavigationMenuItem>
            );
          } else {
            return (
              <NavigationMenuItem key={id}>
                <NavLink to={path}>
                  <Button
                    variant={location.pathname === path ? "default" : "ghost"}
                  >
                    {name}
                  </Button>
                </NavLink>
              </NavigationMenuItem>
            );
          }
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navigation;
