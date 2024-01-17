import { Menu, Dropdown } from "antd";
import Icon from "@/components/icon/Icon";
import { DriverIsActive } from "@/components/elements/TableElements/TableElements";
import { ColumnsType } from "antd/lib/table";
import { IServiceData } from "@/types/service.type";

interface Props {
     handleDelete: any;
     updateStatus: any;
     editFunc: any;
}

const useColumns = ({
     handleDelete,
     updateStatus,
     editFunc,
}: Props): ColumnsType<IServiceData> => {
     return [
          {
               title: "Name",
               dataIndex: "name",
          },
          {
               title: "Companies",
               dataIndex: "companiesCount",
          },
          {
               title: "Drivers",
               dataIndex: "driversCount",
          },
          {
               title: "Trucks",
               dataIndex: "trucksCount",
          },
          {
               title: "Dot Number",
               dataIndex: "dotNumber",
               sorter: {
                    compare: (a, b) => Number(a.dotNumber) - Number(b.dotNumber),
               },
          },
          {
               title: "Status",
               dataIndex: "isActive",
               render: DriverIsActive
          },
          {
               title: "Address",
               dataIndex: "address",
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
                              updateStatus={updateStatus}
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
     updateStatus,
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
                    {
                         key: 2,
                         label: isActive ? "Inactive" : "Active",
                         onClick: () => updateStatus(id, !isActive),
                    },
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
               onClick={(e) => e.stopPropagation()}
               className="dropdown-wrapper"
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
