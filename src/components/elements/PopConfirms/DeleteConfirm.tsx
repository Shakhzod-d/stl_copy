import React from "react";
import { Popconfirm, PopconfirmProps } from "antd";
import Icon from "../../icon/Icon";

const DeleteConfirm: React.FC<PopconfirmProps> = (props) => {
     return (
          <Popconfirm
               okText="Delete"
               cancelText="Cancel"
               placement="left"
               overlayClassName="table-delete-confirm"
               // onConfirm={() => console.log("ok")}
               {...props}
          >
               <div>
                    <Icon icon="close" className="close" />
               </div>
          </Popconfirm>
     );
};

export default DeleteConfirm;
