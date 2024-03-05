import {
  DriverCondition,
  DriverStatus,
  TrackNo,
} from "@/components/elements/TableElements";
import Icon from "@/components/icon/Icon";
import { ICycle } from "@/types";

const { Break, Shift, Cycle, Drive } = DriverCondition();

const useMainColumns = () => {
  return [
    {
      title: "No",
      dataIndex: "no",
    },
    {
      title: "Driver",
      render: (obj: any) => obj.firstName + " " + obj.lastName,
    },
    {
      title: "Truck Unit",
      dataIndex: "vehicleUnit",
      render: TrackNo,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: DriverStatus,
    },
    {
      title: "Last Known Location",
      dataIndex: "location",
      render: (location: any) => location?.name || "-",
    },
    {
      title: "Connection",
      dataIndex: "deviceInfo",
      render: (deviceInfo: any) => (
        <Icon color={deviceInfo?.eldConnection ? "green" : "red"} icon="link" />
      ),
    },
    // {
    //      title: "Errors & Violations",
    //      dataIndex: "errors",
    // },
    // {
    //      title: "Warnings",
    //      dataIndex: "warnings",
    // },
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
      render: (cycle: ICycle) => {
        //    console.log(`cycle`, cycle);
        return Cycle(cycle?.cycle > 0 ? cycle?.cycle : 0);
      },
    },
  ];
};
export { useMainColumns };
