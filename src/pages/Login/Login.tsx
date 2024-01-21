import { useSessionStorage } from "@uidotdev/usehooks";

const Login = (): JSX.Element => {
  const [jwt, setJWT] = useSessionStorage("jwt", "");

  console.log("jwt", jwt);

  return <div>Login</div>;
};

export default Login;
