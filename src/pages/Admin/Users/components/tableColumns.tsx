import { Dropdown, Menu } from "antd";
import Icon from "@/components/icon/Icon";
import { ColumnsType } from "antd/lib/table";
import { role_names } from "@/constants";
import { IUserData } from "@/types/user.type";

interface Props {
     handleDelete: any;
     editFunc: any;
}

const useColumns = ({
     handleDelete,
     editFunc,
}: Props): ColumnsType<IUserData> => {
     return [
          {
               title: "First name",
               dataIndex: "firstName"
          },
          {
               title: "Last name",
               dataIndex: "lastName"
          },
          {
               title: "Phone number",
               dataIndex: "phone",
          },
          {
               title: "Role",
               dataIndex: "role",
               render: (role) => role_names.find(el => el.value === role)?.name
          },
          {
               title: "Email",
               dataIndex: "email",
          },
          {
               title: "Service",
               dataIndex: "service",
               render: (data) => "-",
          },
          {
               title: "Company",
               dataIndex: "company",
               render: (data) => "-",
          },
          {
               title: "Action",
               dataIndex: "_id",
               render: (id: number, order: any) => (
                    <div className="action-menu">
                         <ActionMenu
                              id={id}
                              isActive={order?.isActive}
                              deleteFunc={handleDelete}
                              editFunc={() => editFunc(id)}
                         />
                    </div>
               ),
          },
     ];
};

export { useColumns };
const ActionMenu = ({
     id,
     deleteFunc,
     editFunc,
     isActive,
}: any) => {
     const actionMenu = (
          <Menu
               className="menu-drop-down"
               items={[
                    {
                         key: 1,
                         label: "Edit",
                         onClick: editFunc,
                    },
                    // {
                    //      key: 2,
                    //      label: isActive ? "Inactive" : "Active",
                    //      onClick: () => updateStatus(id, !isActive),
                    // },
                    {
                         key: 4,
                         label: "Delete",
                         onClick: () => deleteFunc(id),
                         danger: true,
                    },
               ]}
          />
     );

     return (
          <div
               className="dropdown-wrapper"
               onClick={(e) => e.stopPropagation()}
          >
               <Dropdown
                    overlay={actionMenu}
                    trigger={["click"]}
                    placement="bottomRight"
               >
                    <div className="option-btn">
                         <Icon icon="three-dots" className="three-dots" />
                    </div>
               </Dropdown>
          </div>
     );
};
