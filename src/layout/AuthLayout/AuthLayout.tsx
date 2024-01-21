import { Outlet } from "react-router-dom";

const AuthLayout = (): JSX.Element => {
  return (
    <div>
      AuthLayout
      <Outlet />
    </div>
  );
};

export default AuthLayout;
