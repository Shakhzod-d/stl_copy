import TruckLoader from "@/components/loaders/TruckLoader";
import LogCorrection from "./LogCorrection";

import { useLogsInnerContext } from "./LogsInner.context";

import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { setCompanyTimeZone } from "@/store/slices/logSlice";

import { DriversHeader } from "@/track/components/shared/drivers-header";
import { Diagrams } from "@/track/components/shared/diagrams";
import { CustomTable } from "@/track/components/shared/custom-table";
import { DriversForm } from "@/track/components/shared/drivers-form";

import { innerTable, LogsFormMap } from "@/track/utils/mapData";
import { setPageLoading } from "@/track/utils/dispatch";
import { useWeekData } from "@/track/hooks/use-data-piker";
import { WeekData } from "@/track/components/shared/drivers-header/drivers-header";
import moment from "moment";
import { setWeekData } from "@/store/slices/company-slice";
import { TripPlanner } from "@/track/components/shared";
import useApi from "@/hooks/useApi";
import { getLocalStorage } from "@/utils";
import { FormData } from "@/types/log.type";
import { driversTableHeader } from "@/track/constants";
import { EditLog } from "@/track/utils/constants";
import api from "@/api";
import { Button } from "antd";

const LogsInner: React.FC = () => {
  const {
    state: {
      disableActions,

      currentLog,
      hoveredId,
      isFetching,
      logData,
      logs,

      time,
      driverData,
    },
    actions: {
      afterRangeChange,
      setHoveredId,
      filterDrawStatus,
      setCurrentLog,
      // setIds,
    },
  } = useLogsInnerContext();

  // ---------------------TIME CONVERTER

  async function getStartDayWithZone(unix: number | null, zone: any | null) {
    try {
      let timezone = zone;
      let midnight: number;

      const myMap = new Map([
        ["Eastern Time", "America/New_York"],
        ["Central Time", "America/Chicago"],
        ["Mountain Time", "America/Denver"],
        ["Pacific Time", "America/Los_Angeles"],
        ["Alaska Time", "America/Anchorage"],
        ["Hawaii-Aleutian Time", "Pacific/Honolulu"],
      ]);

      let zone2 = myMap.get(timezone);
      // console.log(")))))))))))))))))))))))))))))))))0 : ", zone2)
      midnight = moment
        .tz(zone2 ? zone2 : "")
        .startOf("day")
        .unix(); /// hozirgi vaqt time zona orqali olish unixsiz;
      // console.log(")))))))))))))))))))))))))))))))))1 : ", midnight)

      if (unix) {
        midnight = moment
          .unix(unix)
          .tz(zone2 ? zone2 : "")
          .startOf("day")
          .unix();
      }
      // console.log(")))))))))))))))))))))))))))))))))2 : ", midnight)

      // console.log("midnight : ", midnight)
      return await Number(midnight);
    } catch (error) {
      console.log(error);
    }
  }

  const logsTime = getStartDayWithZone(time, driverData?.data?.companyTimeZone);

  // ---------------------TIME CONVERTER
  const dispatch = useDispatch<AppDispatch>();
  const driverId = getLocalStorage("driverId");
  const driverDate = logData?.violation[0]?.date;

  const { data } = useApi(`/mainInfo?driverId=${driverId}&date=${driverDate}`);

  const logsFormData: FormData[] | [] = LogsFormMap(
    data?.data ? data.data : {}
  );

  const date = moment(time).format("LLLL");
  const weekData: WeekData[] = useWeekData(date);
  useEffect(() => {
    if (!!driverData?.data?.companyTimeZone) {
      dispatch(setCompanyTimeZone(driverData?.data?.companyTimeZone));
    }
    dispatch(setWeekData(weekData));
  }, []);

  const [TableLog, setLogs] = useState(innerTable(logs || []));

  useEffect(() => {
    if (logs) {
      setLogs(innerTable(logs));
    }
  }, [logs]);
  setPageLoading(isFetching);
  const driverFullName: string = `${driverData?.data?.firstName || ""} ${
    driverData?.data?.lastName || ""
  }`;

  const driverPhone: string = driverData?.data?.phone || "";
  const handleEditClick = (log: any) => {
    const rowIndex = logs.findIndex((item) => item._id === log);
    const logData = logs.find((item) => item._id === log);
    setCurrentLog(logData);

    const newData = [...logs];
    newData.splice(rowIndex + 1, 0, log);
    const data = innerTable(logs ? logs : []);
    setLogs(data);
  };

  const dataSubmit = () => {
    console.log(1);

    api.put("/log", EditLog);
  };
  return (
    <>
      {/* <div
        className=""
        style={{ pointerEvents: disableActions ? "none" : "all" }}
      > */}
      <DriversHeader fullName={driverFullName} phone={driverPhone} />
      <Diagrams
        filterDrawStatus={filterDrawStatus(logs)}
        data={filterDrawStatus(logs)}
        setHoveredId={setHoveredId}
        hoveredId={hoveredId}
        currentLog={currentLog}
        setCurrentLog={setCurrentLog}
        afterRangeChange={afterRangeChange}
        isFetching={isFetching}
        initialTime={time / 1000}
        cycle={logData?.cycle}
      />

      {(isFetching || disableActions) && <TruckLoader />}
      <div>
        <div id="box">
          {currentLog && (
            <LogCorrection handleCloseEditing={() => setCurrentLog(null)} />
          )}
        </div>
        <CustomTable
          data={TableLog}
          columns={driversTableHeader}
          copyId={5}
          onClick={handleEditClick}
        />
      </div>
      {/* </div> */}

      <DriversForm LogForm={logsFormData ? logsFormData : []} />

      <TripPlanner />
    </>
  );
};

export default LogsInner;
