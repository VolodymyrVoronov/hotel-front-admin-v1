import { ReactNode } from "react";
import { useSessionStorage } from "@uidotdev/usehooks";
import { Navigate } from "react-router-dom";

import { PATHS } from "@/constants";

const RequireAuth = ({ children }: { children: ReactNode }): ReactNode => {
  const [userData] = useSessionStorage<{ jwt: string; role: string } | null>(
    "user-data",
    null
  );

  if (!userData?.jwt) {
    return <Navigate to={`${PATHS.AUTH}/${PATHS.LOGIN}`} />;
  }

  return children;
};

export default RequireAuth;
