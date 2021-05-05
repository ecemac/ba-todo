import React, { useEffect } from "react";
import { Layout, Typography, Button } from "antd";
import { useTranslation } from "react-i18next";
import "./Header.css";

const { Header } = Layout;
const { Title } = Typography;

export const Headers = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Header>
      <Title level={2} style={{ color: "#fff", marginBottom: 0 }}>
        TODO APP
      </Title>
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
      </div>
    </Header>
  );
};
