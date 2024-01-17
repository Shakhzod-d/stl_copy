import React from "react";
import { ModalProps, Modal } from "antd";
import Icon from "../../icon/Icon";
import AppLoader from "../../loaders/AppLoader";

interface Props extends ModalProps {
     loading?: boolean;
     modalLoading?: boolean;
     modalTitle: string;
     formId?: string;
}

const FormModal: React.FC<Props> = (props) => {
     const {
          children,
          onCancel,
          loading,
          modalTitle,
          formId,
          modalLoading = false,
     } = props;
     return (
          <Modal
               centered
               destroyOnClose
               title={modalTitle}
               closeIcon={<Icon icon="close" />}
               okButtonProps={{ loading, htmlType: "submit", form: formId }}
               onCancel={onCancel}
               {...props}
          >
               <main className="relative">
                    {children}
                    <AppLoader loading={modalLoading} />
               </main>
          </Modal>
     );
};

export default FormModal;
