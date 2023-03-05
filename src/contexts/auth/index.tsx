import * as React from "react";
import Cookies from "js-cookie";
import { authReducer } from "./reducer";

export type User = {
  request_token: string;
  isAuthenticated: boolean;
};

export type SignIn = {
  username: string;
  password: string;
};

export type AuthContextProviderProps = {
  children?: React.ReactNode | undefined;
};

export interface AuthState {
  user: User;
  status: string;
  error: string;
}

export interface LoginDataInput {
  token?: string;
  username: string;
  password: string;
}

export enum LoginActionTypes {
  START_LOGIN = "START_LOGIN",
  FINISH_LOGIN = "FINISH_LOGIN",
  FAIL_LOGIN = "FAIL_LOGIN",
  SET_REQUEST_TOKEN = "SET_REQUEST_TOKEN",
  RESOLVE_WITHOUT_LOGIN = "RESOLVE_WITHOUT_LOGIN",
}

export type AuthAction =
  | { type: LoginActionTypes.START_LOGIN }
  | { type: LoginActionTypes.FINISH_LOGIN; token: string }
  | { type: LoginActionTypes.SET_REQUEST_TOKEN; token: string }
  | { type: LoginActionTypes.FAIL_LOGIN; error: string }
  | { type: LoginActionTypes.RESOLVE_WITHOUT_LOGIN };

const INITIAL_STATE: AuthState = {
  user: {
    request_token: "",
    isAuthenticated: false,
  },
  status: "peding",
  error: "",
};

const initialDispatch = () => {
  return {} as AuthState;
};

const AuthContext = React.createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}>({ state: INITIAL_STATE, dispatch: initialDispatch });

AuthContext.displayName = "AuthContext";

function AuthContextProvider(props: AuthContextProviderProps) {
  const [state, dispatch] = React.useReducer(authReducer, {
    user: {
      request_token: "",
      isAuthenticated: false,
    },
    status: "pending",
    error: "",
  });

  const value = { state, dispatch };

  function setupRequestTokenAndLogin() {
    let requestToken = Cookies.get("request-token") || "";

    if (requestToken) {
      dispatch({
        type: LoginActionTypes.FINISH_LOGIN,
        token: requestToken,
      });
    } else {
      dispatch({
        type: LoginActionTypes.RESOLVE_WITHOUT_LOGIN,
      });
    }
  }

  React.useEffect(() => {
    setupRequestTokenAndLogin();
  }, []);

  // if (state.status === "pending") return;

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}

export { AuthContext, AuthContextProvider };
