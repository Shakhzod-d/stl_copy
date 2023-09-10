import { Menu } from "antd";
import { Dropdown } from "antd";
import Icon from "@/components/icon/Icon";
import { DriverIsActive } from "@/components/elements/TableElements/TableElements";
import { ColumnsType } from "antd/lib/table";
import { IDriverData } from "@/types/driver.type";

const useColumns = (): ColumnsType<IDriverData> => {
     return [
          {
               title: "Name",
               render: (order) => `${order.firstName} ${order.lastName}`
          },
          {
               title: "Company",
               dataIndex: "organization",
          },
          {
               title: "username",
               dataIndex: "username",
          },
          {
               title: "email",
               dataIndex: "email",
          },
          {
               title: "phone",
               dataIndex: "phone",
          },
          {
               title: "Status",
               dataIndex: "isActive",
               render: DriverIsActive,
          },
          {
               title: "Home Terminal Address",
               dataIndex: "homeTerminalAddress",
          },
     ];
};

export { useColumns };
