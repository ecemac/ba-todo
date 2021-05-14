import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "../context/AuthProvider";
import { AuthRoute } from "./AuthRoute";
import { Headers } from "../components/Headers";
import { Login } from "../pages/Login";
import { TodoList } from "../pages/TodoList";
import { TodoCalendar } from "../pages/TodoCalendar";
import "../App.css";

export const MainRouter = () => {
  return (
    <AuthProvider>
      <Router>
        <Headers />
        <Switch>
          <Route exact path="/" component={Login} />
          <AuthRoute exact path="/todo-list" component={TodoList} />
          <AuthRoute exact path="/todo-calendar" component={TodoCalendar} />
        </Switch>
      </Router>
    </AuthProvider>
  );
};
