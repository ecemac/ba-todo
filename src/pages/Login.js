import React, { useState, useContext } from "react";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";
import { Layout, Divider } from "antd";
import { Card, Form, Input, Button } from "antd";
import { Error } from "../components/Error";
import { Success } from "../components/Success";
import { CacheManager } from "../services/cache";
import { LoginService } from "../services/LoginService";
import {
  AuthenticationContext,
  AuthSetAllAction,
} from "../context/AuthProvider";
import config from "../config";
import "./Login.css";
import "../i18n";

const { Sider, Content } = Layout;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export const Login = () => {
  const { t } = useTranslation();
  const cacheMngr = new CacheManager();
  const loginService = new LoginService();
  const history = useHistory();
  const authContext = useContext(AuthenticationContext);

  const [success, setSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSignIn = (values) => {
    let body = {
      name: values.name,
      password: values.password,
    };
    fetch("api/sign-in", {
      method: "POST",
      body: JSON.stringify(body),
    }).then((data) => {
      if (data.status === 401) {
        setErrorMsg(t("login.user_not_found"));
        setError(!error);
      } else if (data.status === 200) {
        cacheMngr.set({
          key: config.Login.cacheKey,
          data: JSON.parse(data._bodyText),
        });

        authContext.dispatch(
          AuthSetAllAction({
            authData: loginService.getAuthenticationState(),
          })
        );

        history.push("/todo-list");
      }
    });
  };

  const handleSignUp = (values) => {
    let body = {
      name: values.name,
      password: values.password,
    };
    fetch("api/sign-up", {
      method: "POST",
      body: JSON.stringify(body),
    }).then((data) => {
      if (data.status === 401) {
        setErrorMsg(t("login.user_exists"));
        setError(!error);
      } else if (data.status === 200) {
        setSuccessMsg(t("login.user_created"));
        setSuccess(!success);
      }
    });
  };

  return (
    <Layout>
      <Layout>
        <Sider className="login-sider"></Sider>
        <Content className="login-main">
          <Card title={t("login.sign_in")} style={{ width: 300 }}>
            <Form
              {...layout}
              name="basic"
              initialValues={{ remember: true }}
              onFinish={handleSignIn}
            >
              <Form.Item
                label={t("login.username")}
                name="name"
                rules={[
                  { required: true, message: `${t("login.username_missing")}` },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label={t("login.password")}
                name="password"
                rules={[
                  { required: true, message: `${t("login.password_missing")}` },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  {t("login.submit")}
                </Button>
              </Form.Item>
            </Form>
          </Card>
          <Divider plain>{t("general.or")}</Divider>
          <Card title={t("login.sign_up")} style={{ width: 300 }}>
            <Form
              {...layout}
              name="basic"
              initialValues={{ remember: true }}
              onFinish={handleSignUp}
            >
              <Form.Item
                label={t("login.username")}
                name="name"
                rules={[
                  { required: true, message: `${t("login.username_missing")}` },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label={t("login.password")}
                name="password"
                rules={[
                  { required: true, message: `${t("login.password_missing")}` },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  {t("login.submit")}
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Content>
        <Error open={error} close={() => setError(!error)} message={errorMsg} />
        <Success
          open={success}
          close={() => setSuccess(!success)}
          message={successMsg}
        />
      </Layout>
    </Layout>
  );
};
