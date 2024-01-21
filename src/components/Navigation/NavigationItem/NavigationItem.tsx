import { ReactNode } from "react";
import { NavLink, NavLinkProps } from "react-router-dom";
import cn from "classnames";

interface INavigationItemProps extends NavLinkProps {
  to: string;

  children: ReactNode;
}

const NavigationItem = ({
  to,
  children,

  ...props
}: INavigationItemProps): JSX.Element => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn("flex p-3 text-xl font-medium hover:bg-blue-100", {
          ["text-blue-500 bg-blue-50"]: isActive,
        })
      }
      {...props}
    >
      {children}
    </NavLink>
  );
};

export default NavigationItem;
