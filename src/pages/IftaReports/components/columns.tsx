import React from "react";
import { TableAction } from "@/components/elements/TableElements/TableElements";

const useColumns = () => {
  return [
    {
      title: "No",
      dataIndex: "order",
    },
    {
      title: "VehicleId",
      dataIndex: "vehicleId",
    },
    {
      title: "State",
      dataIndex: "state",
    },
    {
      title: "Miles",
      dataIndex: "miles",
    },
    {
      title: "SystemTime",
      dataIndex: "systemTime",
    },
    {
      title: "Time",
      dataIndex: "time",
    },
    {
      title: "Miles",
      dataIndex: "miles",
    },
    //     {
    //       title: "Actions",
    //       dataIndex: "id",
    //       render: (id: number, order: any) => (
    //         <TableAction
    //           updatePush={`/units/drivers/update/${id}`}
    //           confirmTitle={`Do you want to deactivate ${
    //             order.first_name + " " + order.last_name
    //           }`}
    //         />
    //       ),
    //     },
  ];
};

export default useColumns;
