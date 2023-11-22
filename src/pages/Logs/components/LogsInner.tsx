import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import LogActions from "./LogActions";
import LogForm from "./LogForm";
import LogGraph from "./LogGraph";
import LogHead from "./LogHead";
import TripPlanner from "./TripPlanner";
import useApi from "@/hooks/useApi";
import { useQueryParam, withDefault, NumberParam } from "use-query-params";
import { IDriverData } from "@/types/driver.type";
import { ILog, ILogData } from "@/types/log.type";
import useMomentZone from "@/hooks/useMomentZone";
import TruckLoader from "@/components/loaders/TruckLoader";
import { NOT_DRAW_STATUSES, POINT_STATUSES } from "./constants";
import LogTable from "./LogTable";
import LogCorrection from "./LogCorrection";
import { useGraphColumns } from "./LogTable/columns";
import { TItemStatus } from "@/types";
import {
     addNewLog,
     correctLogsTime,
     cropOneDayLogs,
     fixLogsStatus,
     getNewLog,
     getTodaysInitialTime,
     mapDataBeforeSend,
} from "./correction_algorithms";
import { IInsertInfoLogFormData } from "./LogActions/components/InsertInfoLog";
import { v4 as uuidV4 } from "uuid";
import useApiMutation from "@/hooks/useApiMutation";
import { useEditDailyLog } from "@/api/mutations/logsMutation";
import { getLocalStorage, mapDriverLogs } from "@/utils";
import { notification } from "antd";
import useAppSelector from "@/hooks/useAppSelector";
import moment from "moment";
import { useLogsInnerContext } from "./LogsInner.context";

const LogsInner: React.FC = () => {
     const { state, actions } = useLogsInnerContext();

     const renderInner = () =>
          ({
               table: (
                    <LogTable
                         data={logs}
                         columns={columns}
                         setHoveredId={setHoveredId}
                         hoveredId={hoveredId}
                         driver={driverData?.data}
                         // rowSelection={rowSelection} these are must to be same
                    />
               ),
               correction: (
                    <LogCorrection
                         currentLog={currentLog}
                         onChangeStatus={onChangeStatus}
                         initialTime={time}
                         onCancel={onCancel}
                         onTimeChange={onTimeChange}
                         setLogs={setLogs}
                    />
               ),
               correction_point_log: (
                    <>
                         <LogTable
                              data={logs}
                              columns={columns}
                              setHoveredId={setHoveredId}
                              hoveredId={hoveredId}
                              driver={driverData?.data}
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
                    <LogActions
                         logs={logs}
                         initialTime={time}
                         setTime={setTime}
                         currentLog={currentLog}
                         setCurrentLog={setLog}
                         refetch={refetch}
                         logStatus={isFetching}
                         driverData={driverData?.data}
                         reportData={logData?.report}
                         historyLogs={logData?.history}
                         onInsertInfoLog={onInsertInfoLog}
                         onInsertDutyStatus={onInsertDutyStatus}
                         onNormalize={onNormalize}
                         onTransfer={onTransfer}
                         onRevert={onRevert}
                         onCancel={onCancel}
                         onSend={onSend}
                         onOk={onOk}
                         isLogsEdited={isLogsEdited}
                         croppedTime={croppedTime}
                         infoLogFormData={infoLogFormData}
                         isVisibleInsertInfoLog={isVisibleInsertInfoLog}
                         setInfoLogFormData={setInfoLogFormData}
                         setIsVisibleInsertInfoLog={setIsVisibleInsertInfoLog}
                         transferStatus={transferStatus}
                    />
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
