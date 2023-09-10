import Icon from "@/components/icon/Icon";
import moment from "moment-timezone";
import {
     ICycle,
     ISetState,
} from "@/types";
import {
     DriverStatus,
     TrackNo,
     DriverCondition,
} from "@/components/elements/TableElements";
import { Button } from "antd";
import { POINT_STATUSES } from "./../constants";
import { ILog } from "@/types/log.type";

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
               dataIndex: "currentStatus",
               render: DriverStatus,
          },
          {
               title: "Last Know Location",
               dataIndex: "location",
               render: (location: any) => location?.name || "-"
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
               render: (cycle: ICycle) =>
                    Break(cycle?.break > 0 ? cycle?.break : 0),
          },
          {
               title: "Drive",
               dataIndex: "cycle",
               render: (cycle: ICycle) =>
                    Drive(cycle?.drive > 0 ? cycle?.drive : 0),
          },
          {
               title: "Shift",
               dataIndex: "cycle",
               render: (cycle: ICycle) =>
                    Shift(cycle?.shift > 0 ? cycle?.shift : 0),
          },
          {
               title: "Cycle",
               dataIndex: "cycle",
               render: (cycle: ICycle) =>
                    Cycle(cycle?.cycle > 0 ? cycle?.cycle : 0),
          },
     ];
};

const useGraphColumns = (
     setCurrentLog: ISetState<any>,
     onInsertInfoLogWithFormData: (formData: ILog) => void
) => {
     return [
          {
               title: "#",
               key: "index",
               width: "20px",
               render: (value: any, item: any, index: any) => index + 1,
          },
          {
               title: "status",
               dataIndex: "status",
               render: DriverStatus,
          },
          {
               title: "Start",
               dataIndex: "start",
               render: (start: any) => {
                    return (
                         <span>{moment(start * 1000).format("HH:mm:ss")}</span>
                    );
               },
          },
          {
               title: "duration",
               dataIndex: "hours",
               render(value: any, record: any, index: any) {
                    const start = moment.unix(record.start);
                    const end = moment.unix(record.end);
                    const seconds = moment
                         .duration(end.diff(start))
                         .asSeconds();
                    return moment.utc(seconds * 1000).format("HH:mm:ss");
               },
          },
          {
               title: "location",
               dataIndex: "location",
               render(value: any) {
                    return value?.name;
               },
          },
          // {
          //      title: "Vehicle",
          //      dataIndex: "vehicle",
          // },
          {
               title: "Odometer",
               dataIndex: "odometer",
          },
          {
               title: "Eng. hours",
               dataIndex: "engineHours  ",
          },
          {
               title: "Notes",
               dataIndex: "notes",
          },
          {
               title: "info log after",
               render(value: any, record: ILog, index: any) {
                    return !POINT_STATUSES.includes(record.status) ? (
                         <Button
                              onClick={() =>
                                   onInsertInfoLogWithFormData(record)
                              }
                         >
                              info log after
                         </Button>
                    ) : null;
               },
          },
          {
               title: "action",
               render: (id: any, order: any) => (
                    <div className="action-table">
                         <div
                              onClick={() =>
                                   order.status !== "intermediate" &&
                                   setCurrentLog(order)
                              }
                         >
                              <Icon icon="pencil" className="pencil" />
                         </div>
                    </div>
               ),
          },
     ];
};

const fakeData: any = [
     {
          key: 1,
          no: 1,
          id: 1,
          driver_name: "Nodir Abdunazarov",
          truck_no: "18",
          status: "off",
          last_location: "0.88 mi E of Dayton, OH",
          errors: null,
          warnings: null,
          break: {
               time: "03:03",
               percent: "60",
          },
          drive: {
               time: "04:06",
               percent: "60",
          },
          shift: {
               time: "02:01",
               percent: "60",
          },
          cycle: {
               time: "11:22",
               percent: "80",
          },
     },
     {
          key: 2,
          no: 2,
          id: 2,
          driver_name: "Rajapboyev Temurbek",
          truck_no: "102",
          status: "on",
          last_location: "Yunusobod Axmad Donish",
          errors: null,
          warnings: null,
          break: {
               time: "02:54",
               percent: "29",
          },
          drive: {
               time: "06:16",
               percent: "60",
          },
          shift: {
               time: "09:31",
               percent: "85",
          },
          cycle: {
               time: "44:32",
               percent: "68",
          },
     },
];

export { useMainColumns, useGraphColumns, fakeData };
