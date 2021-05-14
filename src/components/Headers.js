import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Layout, Typography, Button } from "antd";
import { useTranslation } from "react-i18next";
import { AuthenticationContext } from "../context/AuthProvider";
import { LoginService } from "../services/LoginService";
import "./Header.css";

const { Header } = Layout;
const { Title } = Typography;

export const Headers = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const authContext = useContext(AuthenticationContext);

  const loginService = new LoginService();

  return (
    <Header>
      <Title level={2} style={{ color: "#fff", marginBottom: 0 }}>
        TODO APP
      </Title>
      <div>
        <Link to="/todo-list">{t("general.todo_list")}</Link>
        <Link to="/todo-calendar">{t("general.todo_calendar")}</Link>
      </div>
      <div>
        <Button
          style={{ color: "#fff" }}
          type="text"
          onClick={() => changeLanguage("en")}
        >
          EN
        </Button>
        <Button
          style={{ color: "#fff" }}
          type="text"
          onClick={() => changeLanguage("tr")}
        >
          TR
        </Button>
        {authContext.state.isAuthenticated() && (
          <Button
            style={{ color: "#fff" }}
            type="text"
            onClick={() => loginService.logout()}
          >
            {t("login.logout")}
          </Button>
        )}
      </div>
    </Header>
  );
};
