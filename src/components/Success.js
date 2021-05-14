import React from "react";
import { Modal } from "antd";
import { useTranslation } from "react-i18next";

export const Success = ({ open, close, message }) => {
  const { t } = useTranslation();
  return (
    <Modal
      title={t("general.success")}
      visible={open}
      onOk={close}
      onCancel={close}
    >
      <p>{message}</p>
    </Modal>
  );
};
