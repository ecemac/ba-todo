import React from "react";
import { Modal } from "antd";

export const Success = ({ open, close, message }) => {
  return (
    <Modal title="Basic Modal" visible={open} onOk={close}>
      <p>{message}</p>
    </Modal>
  );
};
