import { Modal } from "antd";
import React, { memo } from "react";
import { ConfirmationModalProps } from "../../types";

const ConfirmationModal: React.FC<ConfirmationModalProps> = memo((props) => {
  const { open, onOk, onCancel, title, content } = props;

  const hideModal = () => {
    onCancel();
  };

  return (
    <Modal
      title={title}
      open={open}
      onOk={onOk}
      onCancel={hideModal}
      okText='Confirm'
      cancelText='Cancel'
    >
      <p>{content}</p>
    </Modal>
  );
});

export default ConfirmationModal;
