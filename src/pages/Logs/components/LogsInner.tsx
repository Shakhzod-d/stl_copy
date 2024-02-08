import TruckLoader from "@/components/loaders/TruckLoader";
import MainLayout from "@/layouts/MainLayout";
import { Badge, Checkbox } from "antd";
import LogActions from "./LogActions";
import LogCorrection from "./LogCorrection";
import LogGraph from "./LogGraph";
import LogHead from "./LogHead";
import LogTable from "./LogTable";
import { useLogsInnerContext } from "./LogsInner.context";
import TripPlanner from "./TripPlanner";
import MultiDayGraph from "./MultiDayGraph/container/MultiDayGraph";
import { useEffect, useState } from "react";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { setCompanyTimeZone } from "@/store/slices/logSlice";
import LogForm from "./LogForm";

const LogsInner: React.FC = () => {
  const {
    state: {
      disableActions,
      // ... (other state variables)
      // Include other variables here
      currentLog,
      hoveredId,
      isFetching,
      logData,
      logs,
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
  // console.log("s", s);

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

  // console.log(`driverData?.data`, driverData?.data?.companyTimeZone); //companyTimeZone
  // console.log(`ids`, ids);

  return (
    <MainLayout>
      <div
        className="logs-inner page"
        style={{ pointerEvents: disableActions ? "none" : "all" }}
      >
        {driverData && (
          <LogHead
            driverData={driverData?.data}
            initialTime={time}
            cycle={logData?.cycle}
            logs={logs}
          />
        )}
        <LogActions />
        <div
          style={{
            // border: "1px solid red",
            display: "flex",
            justifyContent: "center",
            // alignItems: "center",
          }}
        >
          <Checkbox
            disabled={!currentLog?.hasOwnProperty("_id")}
            onChange={handleCheckbox1Change}
            checked={checkbox1}
          >
            Log 1
          </Checkbox>
          <Checkbox
            disabled={!currentLog?.hasOwnProperty("_id")}
            onChange={handleCheckbox2Change}
            checked={checkbox2}
          >
            Log 2
          </Checkbox>
        </div>
        <br />
        {logData?.violation.map((violation) => (
          <Badge count={violation.violation} />
        ))}
        <LogGraph
          data={filterDrawStatus(logs)}
          setHoveredId={setHoveredId}
          hoveredId={hoveredId}
          currentLog={currentLog}
          setCurrentLog={setCurrentLog}
          afterRangeChange={afterRangeChange}
          isFetching={isFetching}
          initialTime={time / 1000}
        />
        <MultiDayGraph />
        {(isFetching || disableActions) && <TruckLoader />}
        <div>
          <div id="box">
            {currentLog && (
              <LogCorrection handleCloseEditing={() => setCurrentLog(null)} />
            )}
          </div>

          <LogTable
            data={logs}
            columns={columns}
            setHoveredId={setHoveredId}
            hoveredId={hoveredId}
            driver={driverData?.data}
            //  rowSelection={rowSelection} //these are must to be same
          />
        </div>
      </div>
      <LogForm />
      <TripPlanner />
    </MainLayout>
  );
};

export default LogsInner;
