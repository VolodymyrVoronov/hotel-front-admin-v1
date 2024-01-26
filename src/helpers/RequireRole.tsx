import { ReactNode } from "react";
import { useSessionStorage } from "@uidotdev/usehooks";
import { Navigate, useLocation } from "react-router-dom";

import { PATHS, USER_ROLE } from "@/constants";
import { UserData } from "@/types/user-data.types";

const RequireRole = ({ children }: { children: ReactNode }): ReactNode => {
  const location = useLocation();

  const [userData] = useSessionStorage<UserData>("user-data", null);

  if (
    (userData?.role === USER_ROLE.MANAGER ||
      userData?.role === USER_ROLE.USER) &&
    (location.pathname === PATHS.USERS || location.pathname === PATHS.REGISTER)
  ) {
    return <Navigate to={PATHS.DASHBOARD} />;
  }

  return children;
};

export default RequireRole;
