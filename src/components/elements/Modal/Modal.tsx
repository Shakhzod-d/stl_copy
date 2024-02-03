import React from "react";
import { ModalProps, Modal as AntModal } from "antd";

const Modal: React.FC<ModalProps> = (props) => {
  const { visible, children } = props;

  return (
    <AntModal
      centered
      open={visible}
      destroyOnClose
      closeIcon={null}
      footer={null}
      {...props}
    >
      {children}
    </AntModal>
  );
};

export default Modal;
