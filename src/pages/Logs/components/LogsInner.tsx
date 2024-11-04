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
import { driversTableHeader, Main } from "@/track/constants";
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
import { FormData, LogsFormData } from "@/types/log.type";

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

  const dispatch = useDispatch<AppDispatch>();
  const driverId = getLocalStorage("driverId");
  const { data } = useApi(`/mainInfo?driverId=${driverId}&date=1730368800`);
  // console.log(data);


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
  return (
    <Main>
      <div
        className=""
        style={{ pointerEvents: disableActions ? "none" : "all" }}
      >
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
      </div>

      <DriversForm LogForm={logsFormData ? logsFormData : []} />

      <TripPlanner />
    </Main>
  );
};

export default LogsInner;
