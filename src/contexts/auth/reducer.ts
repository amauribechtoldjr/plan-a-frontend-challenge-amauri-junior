import { AuthAction, AuthState, LoginActionTypes } from ".";

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case LoginActionTypes.START_LOGIN: {
      return {
        ...state,
        status: "pending",
        error: "",
      };
    }
    case LoginActionTypes.SET_REQUEST_TOKEN: {
      return {
        ...state,
        user: {
          ...state.user,
          request_token: action.token,
        },
        error: "",
      };
    }
    case LoginActionTypes.RESOLVE_WITHOUT_LOGIN: {
      return {
        ...state,
        error: "",
        status: "resolved",
      };
    }
    case LoginActionTypes.FINISH_LOGIN: {
      return {
        ...state,
        user: {
          ...state.user,
          request_token: action.token,
          isAuthenticated: true,
        },
        status: "resolved",
        error: "",
      };
    }
    case LoginActionTypes.FAIL_LOGIN: {
      return {
        ...state,
        status: "rejected",
        error: action.error,
      };
    }
    default: {
      throw new Error(`Unhandled action type at loginReducer`);
    }
  }
}

export { authReducer };
