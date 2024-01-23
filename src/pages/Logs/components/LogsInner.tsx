import TruckLoader from "@/components/loaders/TruckLoader";
import MainLayout from "@/layouts/MainLayout";
import { Badge } from "antd";
import LogActions from "./LogActions";
import LogCorrection from "./LogCorrection";
import LogGraph from "./LogGraph";
import LogHead from "./LogHead";
import LogTable from "./LogTable";
import { useLogsInnerContext } from "./LogsInner.context";
import TripPlanner from "./TripPlanner";
import MultiDayGraph from "./MultiDayGraph/container/MultiDayGraph";

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
      // ... (include other variables here)
    },
    actions: {
      afterRangeChange,
      setHoveredId,
      filterDrawStatus,
      setCurrentLog,
    },
  } = useLogsInnerContext();

  // console.log(`currentLog`, currentLog);

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
      {/* <LogForm /> */}
      <TripPlanner />
    </MainLayout>
  );
};

export default LogsInner;
