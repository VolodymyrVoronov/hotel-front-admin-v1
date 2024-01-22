import { ReactNode } from "react";
import { useSessionStorage } from "@uidotdev/usehooks";
import { Navigate } from "react-router-dom";

import { PATHS } from "@/constants";
import { UserData } from "@/types/user-data.types";

const RequireAuth = ({ children }: { children: ReactNode }): ReactNode => {
  const [userData] = useSessionStorage<UserData>("user-data", null);

  if (!userData?.jwt) {
    return <Navigate to={`${PATHS.AUTH}/${PATHS.LOGIN}`} />;
  }

  return children;
};

export default RequireAuth;
