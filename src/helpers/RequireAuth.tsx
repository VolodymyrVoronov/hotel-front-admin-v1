import { ReactNode } from "react";
import { useSessionStorage } from "@uidotdev/usehooks";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }: { children: ReactNode }): ReactNode => {
  const [jwt] = useSessionStorage("jwt", "");

  console.log("jwt", jwt);

  if (!jwt) {
    return <Navigate to="/auth/login" />;
  }

  return children;
};

export default RequireAuth;
