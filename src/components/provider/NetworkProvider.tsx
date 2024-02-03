import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Modal, Result, Button } from "antd";
import { ReloadOutlined } from "@ant-design/icons";

type Props = {
  children: React.ReactNode;
};

const NetworkProvider: React.FC<Props> = ({ children }) => {
  const { isNetworkErr } = useSelector((state: RootState) => state.auth);

  const handleClick = () => {
    window.location.reload();
  };

  return (
    <React.Fragment>
      {children}
      <Modal open={isNetworkErr} closable={false} footer={null} centered>
        <Result
          status="warning"
          title="Iltimos qurilmangizni internetga ulang!"
        />
        <Button
          type="primary"
          onClick={handleClick}
          icon={<ReloadOutlined />}
          style={{ margin: "auto", marginBottom: 32 }}
        >
          Sahifani yangilash
        </Button>
      </Modal>
    </React.Fragment>
  );
};

export default NetworkProvider;
