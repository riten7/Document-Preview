import { Modal } from "antd";
import React from "react";

type ConfirmationModalProps = {
    open: boolean;
    onOk: () => void;
    onCancel: () => void;
    title?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = (props) => {
  const { open, onOk, onCancel, title } = props;

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
      <p>Are you sure you want to confirm the selected fields ?</p>
    </Modal>
  );
};

export default ConfirmationModal;
