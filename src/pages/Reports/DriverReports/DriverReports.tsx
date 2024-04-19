import RangePicker from "@/components/elements/RangePicker";
import Select from "@/components/elements/Select";
import TruckLoader from "@/components/loaders/TruckLoader";
import useApi from "@/hooks/useApi";
import useMomentZone from "@/hooks/useMomentZone";
import { IDriverData } from "@/types/driver.type";
import { IReport } from "@/types/log.type";
import { mapDriverLogs } from "@/utils";
import { DownloadOutlined } from "@ant-design/icons";
import { PDFExport } from "@progress/kendo-react-pdf";
import { Button } from "antd";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import Report from "../../Logs/components/LogActions/components/Report";

interface IQueryParams {
  driverId?: number;
  from: number;
  to: number;
}
interface IDriverReport {
  data: IReport;
  log: any;
}
interface IDriverReportPDF extends IDriverReport {
  initialTime: number;
}
const DriverReports = () => {
  const momentZone = useMomentZone();

  const [selectedDriver, setSelectedDriver] = useState<number>();
  const [date, setDate] = useState<[any, any]>([
    momentZone().startOf("day"),
    momentZone().startOf("day"),
  ]);
  
  const [queryParams, setQueryParams] = useState<IQueryParams>();
  const [driverReport, setDriverReport] = useState<IDriverReportPDF[]>([]);
  const pdfExportComponent = useRef(null) as React.MutableRefObject<null>;

  const { isFetching } = useApi<IDriverReport[]>(`driver/report`, queryParams, {
    enabled:
      !!queryParams?.driverId && !!queryParams?.from && !!queryParams?.to,
    suspense: true,
    onSuccess(data) {
      const driverReportPdfs: IDriverReportPDF[] = data.data.map(
        (driverReport) => {
          if (driverReport?.log) {
            const initialTime = driverReport?.log?.[0]?.start;
            return {
              log: mapDriverLogs(driverReport.log) || [],
              data: driverReport.data,
              initialTime: initialTime,
            };
          } else {
            return {
              log: false,
              data: driverReport.data,
              initialTime: 0,
            };
          }
        }
      );
      setDriverReport(driverReportPdfs);
    },
  });


  // Get all drivers data
  const { data: drivers } = useApi<{ data: IDriverData[] }>(
    "drivers",
    {
      page: 1,
      limit: 15,
    },
    {
      suspense: true,
    }
  );

  
  
  useEffect(() => {

    setQueryParams((prev) => ({
      ...prev,
      driverId: selectedDriver,
      from: moment(date?.[0])?.unix(),
      to: moment(date?.[1])?.unix(),
    }));

  }, [date, selectedDriver]);

  const getReportFileName = () => {
    return (
      "Driver Reports from" +
      moment.unix(queryParams?.from || moment().unix()).format("YYYY-MM-DD") +
      "to" +
      moment.unix(queryParams?.to || moment().unix()).format("YYYY-MM-DD")
    );
  };

  const onRangePickerChange = (props: any) => {
    setDate([momentZone(props[0]), momentZone(props[1])]);
  };

  

  return (
    <div className="drivers-reports page">
      <div className="drivers-reports-header">
        <h4 className="medium-18">DRIVER REPORTS</h4>

        <div className="form">
          <Select
            value={selectedDriver}
            setValue={(val) => {
              setSelectedDriver(val);
            }}
            placeholder="Driver name"
            data={drivers?.data?.data?.map((driver) => ({
              ...driver,
              fullName: `${driver.firstName} ${driver.lastName}`,
            }))}
            labelProp="fullName"
            valueProp="_id"
          />
          <RangePicker
            onChange={onRangePickerChange}
            value={date}
            disabledFuture
          />

          {driverReport.length > 0 && (
            <div className="download-btn">
              <Button
                type="primary"
                onClick={() => {
                  if (pdfExportComponent.current) {
                    // @ts-ignore
                    pdfExportComponent.current?.save();
                  }
                }}
              >
                <DownloadOutlined />
                Download PDF
              </Button>
            </div>
          )}
        </div>

        <div className="daily-logs">
          {isFetching ? (
            <TruckLoader />
          ) : (
            <PDFExport
              forcePageBreak=".page-break"
              ref={pdfExportComponent}
              fileName={getReportFileName()}
              author="STL"
            >
              {driverReport?.map((report, i) => {
                return (
                  report?.log?.length > 0 && (
                    <div
                      className={`daily-log ${i !== 0 ? "page-break" : null}`}
                      key={report?.data?._id + `${i}`}
                    >
                      <Report
                        logs={report?.log}
                        initialTime={report?.initialTime}
                        reportData={report?.data}
                        isPrinting={true}
                        // onDownload={}
                      />
                    </div>
                  )
                );
              })}
            </PDFExport>
          )}
        </div>
      </div>
    </div>
  );
};

export default DriverReports;
