import {
  DriverCondition,
  DriverStatus,
  TrackNo,
} from "@/components/elements/TableElements";
import { ICycle, TItemStatus } from "@/types";
import { IViolation } from "@/types/violation";
import { ColumnsType } from "antd/lib/table";
const { Break, Shift, Cycle, Drive } = DriverCondition();

export const useLogErrorColumns = (): ColumnsType<IViolation> => {
  return [
    {
      title: "No",
      dataIndex: "no",
    },
    {
      title: "Driver",
      render: (obj) => obj.driver.firstName + " " + obj.driver.lastName,
    },
    {
      title: "Error",
      // dataIndex: "vehicleUnit",
      render: (val, record) => record.Violations.violation,
    },
    {
      title: "Status",
      dataIndex: "currentStatus",
      render: (value, record) =>
        DriverStatus(record.Violations.status as TItemStatus),
    },
    {
      title: "Break",
      dataIndex: "cycle",
      render: (cycle: ICycle) => Break(cycle?.break > 0 ? cycle?.break : 0),
    },
    {
      title: "Drive",
      dataIndex: "cycle",
      render: (cycle: ICycle) => Drive(cycle?.drive > 0 ? cycle?.drive : 0),
    },
    {
      title: "Shift",
      dataIndex: "cycle",
      render: (cycle: ICycle) => Shift(cycle?.shift > 0 ? cycle?.shift : 0),
    },
    {
      title: "Cycle",
      dataIndex: "cycle",
      render: (cycle: ICycle) => Cycle(cycle?.cycle > 0 ? cycle?.cycle : 0),
    },
  ];
};
