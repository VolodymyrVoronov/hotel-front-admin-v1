import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useSessionStorage } from "@uidotdev/usehooks";

import { PATHS } from "@/constants";

import { Button, ButtonProps } from "@/components/ui/button";

interface ILogOutProps extends ButtonProps {
  children?: ReactNode;
}

const LogOut = ({ children, ...props }: ILogOutProps): JSX.Element => {
  const navigate = useNavigate();

  const [, setUserData] = useSessionStorage<{
    jwt: string;
    role: string;
  } | null>("user-data", null);

  const onLogOutButtonClick = (): void => {
    setUserData(null);
    navigate(`${PATHS.AUTH}/${PATHS.LOGIN}`);
  };

  return (
    <Button onClick={onLogOutButtonClick} type="button" {...props}>
      {children ?? "Log out"}
    </Button>
  );
};

export default LogOut;
