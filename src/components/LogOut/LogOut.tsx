import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useSessionStorage } from "@uidotdev/usehooks";

import globalState from "@/state/state";
import { PATHS } from "@/constants";
import { UserData } from "@/types/user-data.types";

import { Button, ButtonProps } from "@/components/ui/button";

interface ILogOutProps extends ButtonProps {
  children?: ReactNode;
}

const LogOut = ({ children, ...props }: ILogOutProps): JSX.Element => {
  const navigate = useNavigate();

  const [, setUserData] = useSessionStorage<UserData>("user-data", null);

  const onLogOutButtonClick = (): void => {
    globalState.set({
      userData: {
        jwt: "",
        role: "",
      },
    });
    setUserData(null);
    navigate(`${PATHS.AUTH}/${PATHS.LOGIN}`);
  };

  return (
    <Button
      onClick={onLogOutButtonClick}
      type="button"
      variant="destructive"
      {...props}
    >
      {children ?? "Log out"}
    </Button>
  );
};

export default LogOut;
