import { DriverStatus } from "@/components/elements/TableElements";
import { ILog, IReport } from "@/types/log.type";
import { Table, theme } from "antd";
import { ColumnsType } from "antd/lib/table";
import moment from "moment";
import React, { useEffect, useState } from "react";
import LogGraph from "../../LogGraph";
import { timeZones } from "../../LogTable/helper";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

interface IProps {
  logs: ILog[] | undefined;
  reportData?: any;
  onDownload?: () => void;
  isPrinting: boolean;
  initialTime: number;
  width?: string | number;
}

const Report: React.FC<IProps> = ({
  logs = [],
  isPrinting = false,
  onDownload,
  initialTime = 0,
  reportData,
  width,
}) => {
  const [hoveredId, setHoveredId] = useState<any | null>(null);
  const companyTimeZone = useSelector<RootState>((state) => state?.log?.companyTimeZone);

  const [newLogs, setNewLogs] = useState<ILog[]>(logs)
  const [signature, setSignature] = useState<string>("")
 
  useEffect(() => {
    const newLogData: any = logs?.map((item: ILog) => {
      return {
        ...item,
        start: moment
          .unix(item.start) //@ts-ignore
          .tz(timeZones[companyTimeZone]),
        end: moment
          .unix(item.end) //@ts-ignore
          .tz(timeZones[companyTimeZone]),
      };
    });

    setNewLogs(newLogData)

    if(reportData && reportData.signature){
      setSignature(reportData.signature.trim())
    }
  }, []);


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
          <p>{moment.unix(initialTime).format("YYYY-MM-DD")}</p>
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
            <td colSpan={2}>{reportData?.coDriverId}</td>
          </tr>
          <tr>
            <td>DL Number</td>
            <td>{reportData?.driverLicense}</td>
            <td>Time Zone</td>
            <td>{reportData?.mainOfficeAddress}</td>
          </tr>
          <tr>
            <td>STL ID</td>
            <td>{reportData?.eldId}</td>
            <td>Time Zone Offset</td>
            <td>{reportData?.timeZoneOffset}</td>
          </tr>
          <tr>
            <td>STL Provider </td>
            <td>{reportData?.eldProvider}</td>
            <td>24 Period Starting Time </td>
            <td>{reportData?.periodStartingTime}</td>
          </tr>
          <tr>
            <td>Carrier </td>
            <td>{reportData?.carrier}</td>
            <td>Vehicles (VIN) </td>
            <td>{reportData?.vehicleVin}</td>
          </tr>
          <tr>
            <td>USDOT # </td>
            <td>{reportData?.usDot}</td>
            <td>Exempt Driver Status </td>
            <td>{reportData?.exemptDriverStatus}</td>
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
            <td>{reportData?.distance || "----404----"}</td>
          </tr>
          <tr>
            <td>Shipping Docs</td>
            <td>{reportData?.shippingDocs || "----some docs----"}</td>
          </tr>

          <tr>
            <td colSpan={2}>Malfunction Indicators</td>
            <td colSpan={2}>{reportData?.malfunctionIndicator}</td>
          </tr>

          <tr>
            <td colSpan={2}>Data Diagnostic Indicators</td>
            <td colSpan={2}>{reportData?.dataDiagnosticIndicator}</td>
          </tr>

          <tr>
            <td colSpan={2}>Current Location</td>
            <td colSpan={2}>
              {reportData?.currentLocation || "---Tashkent, Yunusabad---"}
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
          {newLogs?.map((log, i) => (
            <tr key={log._id + `${i}`}>
              <th>{log.vehicleUnit}</th>
              <th>{log.startOdometer}</th>
              <th>{log.endOdometer}</th>
              <th>{log.distance}</th>
            </tr>
          ))}
        </tbody>
      </table>
      <LogGraph
        data={newLogs}
        setHoveredId={setHoveredId}
        initialTime={initialTime}
        hoveredId={hoveredId}
        isFetching={false}
      />
      <Table
        bordered
        className="mb-32"
        columns={columns}
        pagination={false}
        dataSource={newLogs}
        size="small"
        onRow={(record, rowIndex) => {
          return {
            onMouseEnter: () => setHoveredId(record._id), // mouse enter row
            onMouseLeave: () => setHoveredId(null), // mouse leave row
          };
        }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          columnGap: "100px",
        }}
      >
        <div>
          <h3
            style={{ textAlign: "center", maxWidth: "200px", fontSize: "20px" }}
          >
            I certify these entries are true and correct
          </h3>
        </div>
        <div style={{ maxWidth: "150px" }}>
          <div style={{textAlign: "center" }} className="signatur-img">
            {!signature ? <img
              style={{ width: "100%" }}
              src={`https://ptapi.roundedteam.uz/public/uploads/signatures/${signature}`}
              alt="signature"
            /> : <p>not signature</p>}
          </div>
          <h4 style={{textAlign: "center"}}>Driver Signature</h4>
        </div>
      </div>
    </div>
  );
};

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
    render: (value, record, index) => {
      return moment(record.start).format("hh:mm:ss");
    },
  },
  {
    title: "duration",
    dataIndex: "hours",
    render(value, record, index) {
      const start = moment.utc(record.start);
      const end = moment.utc(record.end);
      const seconds = moment.duration(end.diff(start)).asSeconds();
      return seconds ? moment(seconds).format("hh:mm:ss") : moment(seconds).valueOf();
    },
  },
  {
    title: "end",
    dataIndex: "end",
    render(value, record, index) {
      return moment(value).format("hh:mm:ss");
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
