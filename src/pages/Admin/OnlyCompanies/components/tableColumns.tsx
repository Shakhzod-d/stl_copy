import { Dropdown, Menu } from "antd";
import Icon from "@/components/icon/Icon";
import { DriverIsActive } from "@/components/elements/TableElements/TableElements";
import { ColumnsType } from "antd/lib/table";
import { issue_stats } from "@/constants";
import { IOnlyCompanyData } from "@/types/onlyCompany.type";

interface Props {
     handleDelete: any;
     updateStatus: any;
     editFunc: any;
}

const useColumns = ({
     handleDelete,
     editFunc,
     updateStatus,
}: Props): ColumnsType<IOnlyCompanyData> => {
     return [
          {
               title: "Name",
               dataIndex: "companyName",
          },
          {
               title: "phone number",
               dataIndex: "phone",
          },
          {
               title: "Dot Number",
               dataIndex: "usdot",
          },
          {
               title: "Home Terminal Timezone",
               dataIndex: "homeTerminalTimezone",
               filters: issue_stats.map((timezone) => ({
                    text: timezone.label,
                    value: timezone.label,
               })),
               // @ts-ignore
               onFilter: (value: string, record) =>
                    record.homeTerminalTimezone.indexOf(value) === 0,
          },
          {
               title: "company Address",
               dataIndex: "companyAddress",
          },
          {
               title: "Status",
               dataIndex: "isActive",
               render: DriverIsActive,
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
