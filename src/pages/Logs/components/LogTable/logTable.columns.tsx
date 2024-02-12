import { DriverStatus } from "@/components/elements/TableElements";
import Select from "@/components/form/Select";
import TimePicker from "@/components/form/TimePicker";
import Icon from "@/components/icon/Icon";
import { ISetState, RangeLogStatus } from "@/types";
import { ILog } from "@/types/log.type";
import { Button } from "antd";
import { ColumnsType } from "antd/lib/table";
import moment from "moment-timezone";
import { useForm } from "react-hook-form";
// import { useLogsInnerContext } from "../LogsInner.context";
import { LogStatusOptions, POINT_STATUSES, RANGE_STATUSES } from "../constants";
import { v4 as uuidV4 } from "uuid";
import { useLogsInnerContext } from "../LogsInner.context";
import { useEffect } from "react";
// import copyIcon from "../../../../../public/assets/icons/copied-icon.svg";
// import copyIcon from "../../../../assets/"
import { CopyOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { timeZones } from "./helper";

type TFormConnection = {
  fromTo: any;
  lat: any;
  lng: any;
  location: any;
  hours: any;
  odometer: any;
  notes: any;
  vehicle: any;
  document: any;
  trailer: any;
  status: RangeLogStatus;
};
const formNames = {
  fromTo: "fromTo",
  lat: "lat",
  lng: "lng",
  location: "location",
  hours: "hours",
  odometer: "odometer",
  notes: "notes",
  vehicle: "vehicle",
  document: "document",
  trailer: "trailer",
  status: "status",
} as const;

const useGraphColumns = (
  handleEditClick: (log: any) => void,
  currentLog: ILog | null,
  setCurrentLog: ISetState<ILog | null>,
  onInsertInfoLogWithFormData: (formData: ILog) => void
) => {
  // const state = useLogsInnerContext();
  const state = useLogsInnerContext();
  const companyTimeZone = useSelector<RootState>((s) => s.log.companyTimeZone);
  // console.log("s", companyTimeZone);
  // console.log(`state`, state);

  const editItem = (log: any) => {
    document
      ?.querySelector("#box")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
    setCurrentLog(log);
    // document.documentElement.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    // window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };
  const copy = (text: string) => navigator.clipboard.writeText(text);

  // console.log(`currentLog`, currentLog);
  // const formattedTime = moment
  //   .unix(timestamp)
  //   .tz(companyTimeZone as string)
  //   .format("HH:mm:ss"); // based on time zone
  // @ts-ignore
  // console.log(timeZones[companyTimeZone]);

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
          <span>
            {/* {moment(start * 1000).format("HH:mm:ss")} */}
            {/* {JSON.stringify(start)} */}
            {moment
              .unix(start) //@ts-ignore
              .tz(timeZones[companyTimeZone])
              .format("h:mm:ss A")}
          </span>
        );
      },
    },
    {
      title: "duration",
      dataIndex: "hours",
      render(value: any, record: any, index: any) {
        const start = moment.unix(record.start);
        const end = moment.unix(record.end);
        const seconds = moment.duration(end.diff(start)).asSeconds();
        return moment.utc(seconds * 1000).format("HH:mm:ss");
      },
    },
    {
      title: "location",
      dataIndex: "location",
      render(value: any) {
        // console.log(`value`, value);
        // return value?.name;
        if (value.status === "login" || value.status === "logout") {
          return `--`;
        }

        return (
          <span>
            {value?.name}{" "}
            {value.status !== "login" || value.status !== "logout" ? (
              <CopyOutlined
                onClick={() => copy(`${value.lat}, ${value.lng}`)}
                style={{ cursor: "pointer" }}
              />
            ) : (
              "--"
            )}
            {/* <img
              src={copyIcon}
              alt="copy icon"
              onClick={() => copy("text")}
              style={{ cursor: "pointer" }}
            /> */}
          </span>
        );
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
      dataIndex: "engineHours",
    },
    {
      title: "Notes",
      dataIndex: "notes",
    },
    {
      title: "info log after",
      render(value: any, record: ILog, index: any) {
        return !POINT_STATUSES.includes(record.status) ? (
          <Button onClick={() => onInsertInfoLogWithFormData(record)}>
            info log after
          </Button>
        ) : null;
      },
    },
    {
      title: "Origin",
      dataIndex: "origin",
    },
    {
      title: "action",
      render: (id: any, log: ILog) =>
        // @ts-ignore
        RANGE_STATUSES.includes(log.status) ? (
          <div className="action-table">
            <div onClick={() => editItem(log)}>
              <Icon icon="pencil" className="pencil" />
            </div>
          </div>
        ) : null,
    },
  ];
};

const useFormGraphColumns = (): ColumnsType<ILog> => {
  const {
    actions: { setCurrentLog },
  } = useLogsInnerContext();
  const { control, formState } = useForm<TFormConnection>();

  return [
    {
      title: "#",
      key: "index",
      width: "20px",
      render: (value, item, index) => index + 1,
    },
    {
      title: "status",
      dataIndex: "status",
      render: () => (
        <Select
          data={LogStatusOptions}
          name="status"
          control={control}
          label=""
        />
      ),
    },
    {
      title: "Time",
      dataIndex: "time",
      render: () => (
        <TimePicker
          label={""}
          // placeholder={formNames.from}
          name={formNames.status}
          control={control}
          range={true}
          required
        />
      ),
    },
    {
      title: "action",
      render: (id: any, order: any) => (
        <div onClick={() => setCurrentLog(null)} className="action-table">
          <Icon icon="close" className="close" />
        </div>
      ),
    },
  ];
};

export { useGraphColumns, useFormGraphColumns };
