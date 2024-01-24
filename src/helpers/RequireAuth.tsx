import { ReactNode } from "react";
import { useSessionStorage } from "@uidotdev/usehooks";
import { Navigate } from "react-router-dom";

import globalState from "@/state/state";

import { PATHS } from "@/constants";
import { UserData } from "@/types/user-data.types";

const RequireAuth = ({ children }: { children: ReactNode }): ReactNode => {
  const [userData] = useSessionStorage<UserData>("user-data", null);

  if (!userData?.jwt) {
    return <Navigate to={`${PATHS.AUTH}/${PATHS.LOGIN}`} />;
  }

  globalState.set({
    userData: {
      jwt: userData?.jwt || "",
      role: userData?.role || "",
    },
  });

  return children;
};

export default RequireAuth;
