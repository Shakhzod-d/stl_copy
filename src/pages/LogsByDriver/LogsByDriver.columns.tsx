import {
  DriverCondition,
  DriverStatus,
  TrackNo,
} from "@/components/elements/TableElements";
import Icon from "@/components/icon/Icon";
import { ICycle, ISetState, TItemStatus } from "@/types";
import { IDriverData } from "@/types/driver.type";
import { ILog } from "@/types/log.type";
import { Button } from "antd";
import { ColumnType, ColumnsType } from "antd/lib/table";
import moment from "moment-timezone";

export interface ILogsByDriver {
  _id: string;
  isDeleted: false;
  driverId: string;
  start: number;
  end: number;
  duration: number;
  status: TItemStatus;
  engineHours: number;
  odometer: number;
  distance: number;
  document: string;
  notes: string;
  trailer: string;
  serviceId: string;
  companyId: string;
  vehicleId: string;
  vehicleUnit: string;
  coDriverId: string;
  location: {
    lat: number;
    lng: number;
    name: string;
    _id: string;
  };
  hasFlag: true;
  hasCycle: false;
  isFirst: false;
  isEnded: false;
  date: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  EldLocation: {
    lat: number;
    lng: number;
    name: string;
    _id: string;
  } | null;
  cycle: null;
}

const { Break, Shift, Cycle, Drive } = DriverCondition();

const useColumnsLogsByDriver = (): ColumnsType<ILogsByDriver> => {
  return [
    {
      title: "No",
      dataIndex: "no",
    },
    {
      title: "Date",
      render(value, record, index) {
        return moment.unix(record.date).format("DD-MM-YYYY");
      },
    },
    {
      title: "Truck Unit",
      dataIndex: "vehicleUnit",
      render: (value, record) => TrackNo(record.vehicleUnit),
    },
    {
      title: "Status",
      dataIndex: "currentStatus",
      render: (value, record) => DriverStatus(record.status as TItemStatus),
    },
    {
      title: "Last Know Location",
      dataIndex: "location",
      render: (value, record) => record.EldLocation?.name || "-",
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
      render: (cycle: ICycle) => Cycle(cycle?.cycle > 0 ? cycle?.cycle : 0),
    },
  ];
};

export { useColumnsLogsByDriver };
