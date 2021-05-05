import React, { useEffect, useContext } from "react";
import { Route, useHistory } from "react-router-dom";
import { AuthenticationContext } from "../context/AuthProvider";

export const AuthRoute = ({ component: Component, ...rest }) => {
  const {
    state: { isAuthenticated },
  } = useContext(AuthenticationContext);

  const history = useHistory();

  useEffect(() => {
    if (!isAuthenticated()) history.push("/");
  }, []);

  return (
    isAuthenticated() && (
      <Route {...rest} render={(props) => <Component {...props} />}></Route>
    )
  );
};
