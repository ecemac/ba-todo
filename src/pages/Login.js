import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Layout, Typography, Divider } from "antd";
import { Card, Form, Input, Button } from "antd";
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

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Layout>
      <Layout>
        <Sider></Sider>
        <Content>
          <Card title={t("login.sign_in")} style={{ width: 300 }}>
            <Form
              {...layout}
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label={t("login.username")}
                name={t("login.username")}
                rules={[
                  { required: true, message: `${t("login.username_missing")}` },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label={t("login.password")}
                name={t("login.password")}
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
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label={t("login.username")}
                name={t("login.username")}
                rules={[
                  { required: true, message: `${t("login.username_missing")}` },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label={t("login.password")}
                name={t("login.password")}
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
      </Layout>
    </Layout>
  );
};
