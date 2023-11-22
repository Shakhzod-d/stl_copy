import TruckLoader from "@/components/loaders/TruckLoader";
import MainLayout from "@/layouts/MainLayout";
import LogActions from "./LogActions";
import LogCorrection from "./LogCorrection";
import LogForm from "./LogForm";
import LogGraph from "./LogGraph";
import LogHead from "./LogHead";
import LogTable from "./LogTable";
import { useLogsInnerContext } from "./LogsInner.context";
import TripPlanner from "./TripPlanner";

const LogsInner: React.FC = () => {
     const {
          state: {
               disableActions,
               // ... (other state variables)
               // Include other variables here
               logStatus,
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

     const renderInner = () =>
          ({
               table: (
                    <LogTable
                         data={logs}
                         columns={columns}
                         setHoveredId={setHoveredId}
                         hoveredId={hoveredId}
                         // rowSelection={rowSelection} these are must to be same
                    />
               ),
               correction: <LogCorrection />,
               correction_point_log: (
                    <>
                         <LogTable
                              data={logs}
                              columns={columns}
                              setHoveredId={setHoveredId}
                              hoveredId={hoveredId}
                              // rowSelection={rowSelection} these are must to be same
                         />
                    </>
               ),
          }[logStatus]);

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
                    <LogGraph
                         data={filterDrawStatus(logs)}
                         setHoveredId={setHoveredId}
                         hoveredId={hoveredId}
                         currentLog={currentLog}
                         setCurrentLog={setCurrentLog}
                         afterRangeChange={afterRangeChange}
                         logStatus={isFetching}
                         initialTime={time / 1000}
                    />

                    {(isFetching || disableActions) && <TruckLoader />}
                    {renderInner()}
               </div>
               <LogForm />
               <TripPlanner />
          </MainLayout>
     );
};

export default LogsInner;
