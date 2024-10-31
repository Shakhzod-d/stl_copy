import TruckLoader from "@/components/loaders/TruckLoader";

import { Badge, Checkbox } from "antd";
import LogActions from "./LogActions";
import LogCorrection from "./LogCorrection";
import LogGraph from "./LogGraph";
import LogHead from "./LogHead";
import LogTable from "./LogTable";
import { useLogsInnerContext } from "./LogsInner.context";
// import TripPlanner from "./TripPlanner";

import MultiDayGraph from "./MultiDayGraph/container/MultiDayGraph";
import { useEffect, useState } from "react";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { setCompanyTimeZone } from "@/store/slices/logSlice";
import LogForm from "./LogForm";
import { Recap } from "./Recap";
import { DriversHeader } from "@/track/components/shared/drivers-header";
import { Diagrams } from "@/track/components/shared/diagrams";
import { CustomTable } from "@/track/components/shared/custom-table";
import { driversTableHeader, Main } from "@/track/constants";
import { DriversForm } from "@/track/components/shared/drivers-form";
import { TripPlanner } from "@/track/components/shared/trip-planner";
import { innerTable } from "@/track/utils/mapData";
import { setPageLoading } from "@/track/utils/dispatch";

const LogsInner: React.FC = () => {
  const {
    state: {
      disableActions, //----------------> false
      // ... (other state variables)
      // Include other variables here
      currentLog, //-------null
      hoveredId, //-----------------------> 668978a6b53c69bda65551ae
      isFetching, //----------------------->false
      logData,
      logs,
      log,
      time,
      driverData,
      columns,
      ids,
      // ... (include other variables here)
    },
    actions: {
      afterRangeChange,
      setHoveredId,
      filterDrawStatus,
      setCurrentLog,
      setIds,
    },
  } = useLogsInnerContext();
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox1Active, setCheckbox1Active] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);
  const [checkbox2Active, setCheckbox2Active] = useState(false);
  const s = useSelector<RootState>((s) => s.log);
  const dispatch = useDispatch<AppDispatch>();

  const handleCheckbox1Change = (e: CheckboxChangeEvent) => {
    setCheckbox1(e.target.checked);
    setCheckbox1Active(e.target.checked);
  };

  const handleCheckbox2Change = (e: CheckboxChangeEvent) => {
    setCheckbox2(e.target.checked);
    setCheckbox2Active(e.target.checked);
  };

  useEffect(() => {
    if (checkbox1 && checkbox1Active) {
      setIds((pre) => ({ ...pre, _id1: currentLog?._id as string }));
      setCheckbox1Active(false);
    }

    if (checkbox2 && checkbox2Active) {
      setIds((pre) => ({ ...pre, _id2: currentLog?._id as string }));
      setCheckbox2Active(false);
    }
  }, [checkbox1, checkbox2]);

  useEffect(() => {
    if (!!driverData?.data?.companyTimeZone) {
      dispatch(setCompanyTimeZone(driverData?.data?.companyTimeZone));
    }
  }, []);

  const tableData = innerTable(logs ? logs : []);
  // console.log(`driverData?.data`, driverData?.data?.companyTimeZone); //companyTimeZone
  console.log(logs);
  setPageLoading(isFetching);
  return (
    <Main>
      <div
        className=""
        style={{ pointerEvents: disableActions ? "none" : "all" }}
      >
        <DriversHeader />
        {/* <LogActions/> */}
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
        />

        {/* <MultiDayGraph /> */}
        {(isFetching || disableActions) && <TruckLoader />}
        <div>
          <div id="box">
            {currentLog && (
              <LogCorrection handleCloseEditing={() => setCurrentLog(null)} />
            )}
          </div>
          <CustomTable data={tableData} columns={driversTableHeader} copyId={5}/>
        </div>
      </div>

      <DriversForm />

      <TripPlanner />
    </Main>
  );
};

export default LogsInner;
