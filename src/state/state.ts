import { hookstate } from "@hookstate/core";

export interface IGlobalState {
  userData: {
    jwt: string;
    role: string;
  };
}

const globalState = hookstate<IGlobalState>({
  userData: {
    jwt: "",
    role: "",
  },
});

export default globalState;
