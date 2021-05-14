import React from "react";
import { Modal } from "antd";
import { useTranslation } from "react-i18next";

export const Error = ({ open, close, message }) => {
  const { t } = useTranslation();
  return (
    <Modal
      title={t("general.error")}
      visible={open}
      onOk={close}
      onCancel={close}
    >
      <p>{message}</p>
    </Modal>
  );
};
