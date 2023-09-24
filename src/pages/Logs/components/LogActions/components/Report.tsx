import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import moment from "moment-timezone";
import React, { useState, useMemo } from "react";
import { DriverStatus } from "@/components/elements/TableElements";
import LogGraph from "../../LogGraph";
import { POINT_STATUSES } from "./../../constants";
import { ILog, IReport } from "@/types/log.type";
import useMomentZone from "@/hooks/useMomentZone";

interface IProps {
  logs: ILog[];
  reportData?: IReport;
  onDownload?: () => void;
  isPrinting: boolean;
  initialTime: number;
  width?: string | number;
}

const Report: React.FC<IProps> = ({
  logs,
  isPrinting,
  onDownload,
  initialTime,
  reportData,
  width,
}) => {
  const momentZone = useMomentZone();

  const [hoveredId, setHoveredId] = useState<any | null>(null);

  console.log("initialTime", initialTime);

  // console.log(momentZone(initialTime).unix());

  return (
    <div
      className="report-container"
      style={{
        width: width || 880,
        padding: 20,
        margin: "16px auto",
      }}
    >
      <div className="mb-16 d-flex justify-space-between align-center">
        <p>USA Property 70 hour / 8 day</p>
        <div className="text-center">
          <h1 className="report-title">Drivers daily log</h1>
          <p>{moment(initialTime).format("YYYY-MM-DD")}</p>
        </div>
        {isPrinting ? (
          <>
            <div></div>
            <div></div>
          </>
        ) : (
          <div></div>
        )}
      </div>
      <table style={{ width: "100%" }} border={1}>
        <tbody>
          <tr>
            <td colSpan={2}>Driver</td>
            <td colSpan={2}>
              {reportData?.firstName}
              {reportData?.lastName}
            </td>
          </tr>
          <tr>
            <td>Driver ID</td>
            <td>{reportData?._id}</td>
            <td>ST</td>
            <td>{reportData?.driverLicenseIssuingState}</td>
          </tr>
          <tr>
            <td colSpan={2}>Co-Drivers (ID)</td>
            <td colSpan={2}>{reportData?.coDriver}</td>
          </tr>
          <tr>
            <td>DL Number</td>
            <td>{reportData?.driverLicense}</td>
            <td>Time Zone</td>
            <td>{reportData?.mainOfficeAddress}</td>
          </tr>
          <tr>
            <td>ELD ID</td>
            <td>----4AWJ----</td>
            <td>Time Zone Offset</td>
            <td>----UTC-5----</td>
          </tr>
          <tr>
            <td>ELD Provider </td>
            <td>TMK ELD</td>
            <td>24 Period Starting Time </td>
            <td>----Midnight----</td>
          </tr>
          <tr>
            <td>Carrier </td>
            <td>{reportData?.carrier}</td>
            <td>Vehicles (VIN) </td>
            <td>{reportData?.vehicleVin}</td>
          </tr>
          <tr>
            <td>USDOT # </td>
            <td>----3512194-----</td>
            <td>Exempt Driver Status </td>
            <td>----NO----</td>
          </tr>
          <tr>
            <td>Main Office </td>
            <td>{reportData?.mainOfficeAddress}</td>
            <td>Trailers </td>
            <td>{reportData?.trailers || "----trailers----"}</td>
          </tr>
          <tr>
            <td>Home Terminal </td>
            <td>{reportData?.homeTerminalAddress}</td>
            <td>Distance </td>
            <td>{reportData?.distance || "----404----"}mi</td>
          </tr>
          <tr>
            <td>Shipping Docs</td>
            <td>{reportData?.shippingDocs || "----some docs----"}</td>
          </tr>

          <tr>
            <td colSpan={2}>Malfunction Indicators</td>
            <td colSpan={2}>----NO----</td>
          </tr>

          <tr>
            <td colSpan={2}>Data Diagnostic Indicators</td>
            <td colSpan={2}>----NO----</td>
          </tr>

          <tr>
            <td colSpan={2}>Current Location</td>
            <td colSpan={2}>
              {reportData?.currentLocation?.name || "---Tashkent, Yunusabad---"}
            </td>
          </tr>

          <tr>
            <td colSpan={2}>Unidentified Driver Records</td>
            <td colSpan={2}>----0----</td>
          </tr>
        </tbody>
      </table>
      <br />
      <table style={{ width: "100%" }} border={1}>
        <thead>
          <tr>
            <th>Vehicle</th>
            <th>Start</th>
            <th>End</th>
            <th>Distance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>7</td>
            <td>6497</td>
            <td>6562</td>
            <td>65 mi</td>
          </tr>
          <tr>
            <td>7</td>
            <td>6562</td>
            <td>6603</td>
            <td>41 mi</td>
          </tr>
        </tbody>
      </table>
      <LogGraph
        data={logs}
        setHoveredId={setHoveredId}
        initialTime={momentZone(initialTime).unix() * 1000}
        hoveredId={hoveredId}
        logStatus={false}
      />
      <Table
        bordered
        columns={columns}
        pagination={false}
        dataSource={logs}
        size="small"
        onRow={(record: any, rowIndex) => {
          return {
            onMouseEnter: () => setHoveredId(record._id), // mouse enter row
            onMouseLeave: () => setHoveredId(null), // mouse leave row
          };
        }}
      />
    </div>
  );
};
interface DataType {
  key: React.Key;
  status: string;
  time: any;
  duration: any;
  location: any;
  odometer: any;
  hours: number;
  notes: string;
}

const columns: ColumnsType<ILog> = [
  {
    title: "№",
    dataIndex: "index",
    render(value, record, index) {
      return index + 1;
    },
    width: 15,
  },
  {
    title: "status",
    dataIndex: "status",
    render: DriverStatus,
  },
  {
    title: "start",
    dataIndex: "start",
    render(value, record, index) {
      return moment(value * 1000).format("HH:mm:ss");
    },
  },
  {
    title: "duration",
    dataIndex: "hours",
    render(value, record, index) {
      const start = moment.unix(record.start);
      const end = moment.unix(record.end);
      const seconds = moment.duration(end.diff(start)).asSeconds();
      return moment.utc(seconds * 1000).format("HH:mm:ss");
    },
  },
  {
    title: "end",
    dataIndex: "end",
    render(value, record, index) {
      return moment(value * 1000).format("HH:mm:ss");
    },
  },
  {
    title: "location",
    dataIndex: "location",
    render(value, record: ILog, index) {
      return record?.location?.name || "location is not given";
    },
  },
  {
    title: "odometer",
    dataIndex: "odometer",
  },
  {
    title: "Eng Hours",
    dataIndex: "engineHours",
    render(value, record: ILog, index) {
      return value || 0;
    },
  },
  {
    title: "notes",
    dataIndex: "notes",
  },
];

export default Report;
