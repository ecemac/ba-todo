import React from "react";
import moment from "moment";
import { Modal, Form, DatePicker, Input, Button } from "antd";
import { useTranslation } from "react-i18next";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export const EditTask = ({ open, close, type, action, data }) => {
  const { t } = useTranslation();

  const config = {
    rules: [
      {
        type: "object",
        required: true,
        message: `${t("todo_list.date_missing")}`,
      },
    ],
  };

  const onSubmit = (values, id) => {
    let todo = {
      task: values.task,
      date: values.date,
      done: false,
    };

    switch (type) {
      case "add":
        action(todo);
        close();
        break;
      case "edit":
        action(todo, id);
        close();
        break;
      default:
        break;
    }
  };

  return (
    <Modal
      title={
        type === "add" ? t("todo_list.add_todo") : t("todo_list.edit_todo")
      }
      visible={open}
      onOk={close}
      onCancel={close}
      footer={null}
    >
      <Form
        name="time_related_controls"
        {...formItemLayout}
        onFinish={(values) => onSubmit(values, data?.id)}
      >
        <Form.Item
          name="task"
          label={t("todo_list.task")}
          rules={[
            { required: true, message: `${t("todo_list.task_missing")}` },
          ]}
        >
          <Input defaultValue={data?.task || ""} />
        </Form.Item>
        <Form.Item name="date" label={t("todo_list.date")} {...config}>
          <DatePicker defaultValue={moment(data?.date) || ""} />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            {t("general.done")}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
