import React from "react";
import { TableAction } from "@/components/elements/TableElements/TableElements";

const useColumns = () => {
     return [
          {
               title: "No",
               dataIndex: "no",
          },
          {
               title: "Type",
               dataIndex: "",
          },
          {
               title: "Name",
               dataIndex: "",
          },
          {
               title: "Created time",
               dataIndex: "",
          },
          {
               title: "Recipient",
               dataIndex: "",
          },
          {
               title: "Status",
               dataIndex: "",
          },
          {
               title: "Actions",
               dataIndex: "id",
               render: (id: number, order: any) => (
                    <TableAction
                         updatePush={`/units/drivers/update/${id}`}
                         confirmTitle={`Do you want to deactivate ${order.first_name + ' ' + order.last_name}`}
                    />
               ),
          }
     ];
}


export default useColumns