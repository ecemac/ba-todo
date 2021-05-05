import React, { createContext, useReducer } from "react";
import { LoginService } from "../services/LoginService";

export const AuthSetAllAction = (state) => ({
  type: "SET_ALL",
  payload: state,
});

const INITIAL_STATE = {
  authData: new LoginService().getAuthenticationState(),
  isAuthenticated: () =>
    new LoginService().getAuthenticationState() ? true : false,
};

const AuthReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_ALL": {
      const newState = Object.assign({}, state, {
        authData: action?.payload?.authData,
      });
      return newState;
    }
    case "CLEAR":
    default:
      return state;
  }
};

const context = createContext({
  state: INITIAL_STATE,
  dispatch: () => {},
});

const { Provider } = context;

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { context as AuthenticationContext, AuthProvider };
