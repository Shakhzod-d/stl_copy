import { useEditDailyLog } from "@/api/mutations/logsMutation";
import useApi from "@/hooks/useApi";
import useApiMutation from "@/hooks/useApiMutation";
import useAppSelector from "@/hooks/useAppSelector";
import useMomentZone from "@/hooks/useMomentZone";
import { TItemStatus } from "@/types";
import { IDriverData } from "@/types/driver.type";
import { ILog, ILogData } from "@/types/log.type";
import { mapDriverLogs } from "@/utils";
import { notification } from "antd";
import moment from "moment";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { NumberParam, useQueryParam, withDefault } from "use-query-params";
import { v4 as uuidV4 } from "uuid";
import { IInsertInfoLogFormData } from "./LogActions/components/InsertInfoLog";
import { useGraphColumns } from "./LogTable/logTable.columns";
import { NOT_DRAW_STATUSES, POINT_STATUSES } from "./constants";
import {
   addNewLog,
   correctLogsTime,
   cropOneDayLogs,
   fixLogsStatus,
   getNewLog,
   getTodaysInitialTime,
   mapDataBeforeSend,
} from "./correction_algorithms";

const useLogsInner = () => {
   const momentZone = useMomentZone();

   const { userData } = useAppSelector(({ auth }) => auth);

   const { id } = useParams<{ id: string }>();
   const [time, setTime] = useQueryParam(
      "time",
      withDefault(NumberParam, moment().valueOf())
   );

   const { data, refetch, isFetching } = useApi<ILogData>(
      "/logs",
      { date: time / 1000, driverId: id },
      { suspense: true }
   );
   const { data: driverData } = useApi<IDriverData>(
      `driver/${id}`,
      {},
      { suspense: true }
   );

   const { mutate, status: transferStatus } = useApiMutation<ILogData>("logs");

   const { editLogsMutation, editLogsLoading } = useEditDailyLog((props) => {
      setIsLogsEdited(false);
      // setLogStatus("table");
      setInitialLogs(logs);
      setRangeVal(0);
      refetch();
   });

   const [currentLog, setCurrentLog] = useState<ILog | null>(null);
   const [isVisibleInsertInfoLog, setIsVisibleInsertInfoLog] = useState(false);
   const [infoLogFormData, setInfoLogFormData] = useState<ILog | undefined>();
   const [isLogsEdited, setIsLogsEdited] = useState(false);
   const [rangeVal, setRangeVal] = useState<any>();

   const [log, setLog] = useState<ILog | null>(null);
   const [logs, setLogs] = useState<ILog[]>([]);
   const [initialLogs, setInitialLogs] = useState<ILog[]>([]);
   const [hoveredId, setHoveredId] = useState<string | null>(null);
   const [croppedTime, setCroppedTime] = useState<[number, number]>();

   const fetchLogParams = {
      driverId: id,
      date: getTodaysInitialTime(),
   };

   const logData: ILogData | undefined = useMemo(() => {
      if (data?.data) {
         if (data.data.log?.length) {
            const mappedLogs = mapDriverLogs(data.data.log);
            const { croppedLogs, croppedTime: croppedTimeFromData } =
               cropOneDayLogs(mappedLogs, fetchLogParams.date);
            setCroppedTime(croppedTimeFromData);
         }
         return data?.data;
      }
   }, [data]);

   let totalTime = useMemo(() => {
      const rangeLogs = logs.filter(
         (log) => !POINT_STATUSES.includes(log.status)
      );
      return rangeLogs[rangeLogs.length - 1]?.end;
   }, [logs]);

   useEffect(() => {
      if (logData?.log) {
         const startDay = momentZone(time).startOf("day").unix();
         const endDay = momentZone(time).endOf("day").unix();

         const data = logData?.log.map((el) => {
            return {
               ...el,
               start: el.start >= startDay ? el.start : startDay,
               end: el.end <= endDay ? el.end : endDay,
            };
         });
         setInitialLogs(data);
         setLogs(data);
      }
   }, [logData]);

   useEffect(() => {
      if (currentLog) {
         setIsLogsEdited(false);
         // setLogStatus("correction");
      } else if (!currentLog) {
         // setLogStatus("table");
      }
   }, [currentLog]);

   const onInsertInfoLogWithFormData = (formData: ILog) => {
      setInfoLogFormData(formData);
      setIsVisibleInsertInfoLog(true);
   };

   const graphColumns = useGraphColumns(
      currentLog,
      setCurrentLog,
      onInsertInfoLogWithFormData
   );

   const filterDrawStatus = (data: ILog[]) => {
      return data.filter((el) => !NOT_DRAW_STATUSES.includes(el.status));
   };

   const afterRangeChange = (val: any, currLog: ILogData) => {
      setRangeVal(val);
   };

   const onCancel = () => {
      setLogs(initialLogs);
      setRangeVal(undefined);
      setIsLogsEdited(false);
      setCurrentLog(null);
   };

   const onChangeStatus = (val: TItemStatus) => {
      if (!currentLog?.isNewLog) {
         setIsLogsEdited(true);
         const newLogs =
            logs &&
            fixLogsStatus(
               logs?.map((item) => {
                  return currentLog?._id === item?._id
                     ? {
                          ...item,
                          status: val,
                       }
                     : { ...item };
               })
            );
         setCurrentLog(
            (prev) => newLogs?.find((log) => prev?._id === log._id) || null
         );
         setLogs(newLogs);
      } else if (currentLog?.isNewLog) {
         setCurrentLog((prev) => ({
            ...prev!,
            status: val,
            rangeVal,
         }));
         setLogs([
            ...logs.filter((log) => log?._id !== currentLog?._id),
            { ...currentLog, status: val, rangeVal },
         ]);
      }
   };

   const onTimeChange = (range: [any, any]) => {
      // const startDayOclock = moment("00:00:00", "HH:mm:ss").unix();
      setRangeVal([
         range[0].unix() - time / 1000,
         range[1].unix() - time / 1000,
      ]);
      // @ts-ignore
      setCurrentLog({
         ...currentLog,
         rangeVal: [
            range[0].unix() - time / 1000,
            range[1].unix() - time / 1000,
         ],
      });
   };

   const onInsertInfoLog = (infoLog: IInsertInfoLogFormData) => {
      // @ts-ignore
      const newLog: ILog = {
         ...infoLog,
         _id: uuidV4(),
         document: "",
         // coDriverId: 0,
         // company: "",
         // driverId: fetchLogParams?.driverId,
         duration: 0,
         start: infoLog.time + time - 1,
         end: infoLog.time + time - 1,
      };
      // @ts-ignore
      setLogs(sortLogsByTime([...logs, newLog]));
   };

   const onNormalize = () => {};

   const onTransfer = (duration: number, log: ILog) => {
      // console.log({
      //      ...log,
      //      duration: duration - initialTime,
      //      // @ts-ignore
      //      start: log?.cropPoint === "start" ? croppedTime[0] : log?.start,
      //      // @ts-ignore
      //      end: log?.cropPoint === "end" ? croppedTime[1] : log?.end,
      // });
      mutate({
         ...log,
         // duration: duration - time,
         // @ts-ignore
         start: log?.cropPoint === "start" ? croppedTime[0] : log?.start,
         // @ts-ignore
         end: log?.cropPoint === "end" ? croppedTime[1] : log?.end,
      });
   };

   const onRevert = (revertLogs: ILog[]) => {
      setLogs(revertLogs);
   };
   const [disableActions, setDisableActions] = useState(false);
   const onSend = () => {
      if (true) {
         setDisableActions(true);
         setRangeVal(undefined);
         setCurrentLog(null);
         const payload = {
            ...fetchLogParams,
            date: time / 1000,
            log: mapDataBeforeSend(logs, croppedTime, true, driverData!.data),
            historyLog: {
               user: userData?.firstName + " " + userData?.lastName,
               driverId: fetchLogParams.driverId,
               afterLogs: mapDataBeforeSend(
                  logs,
                  [0, 0],
                  false,
                  driverData!.data
               ),
               beforeLogs: mapDataBeforeSend(
                  initialLogs,
                  [0, 0],
                  false,
                  driverData!.data
               ),
            },
         };
         console.log("🔥payload: ", payload);
         setDisableActions(false);
         editLogsMutation(payload);
      } else {
         notification.error({
            message: "Change something before send!",
         });
      }
   };

   const onOk = () => {
      setIsLogsEdited(true);
      if (rangeVal) {
         if (currentLog?.isNewLog) {
            const res = addNewLog(
               logs,
               {
                  ...currentLog,
                  start: rangeVal[0] + time / 1000,
                  end: rangeVal[1] + time / 1000,
                  isNewLog: false,
                  // @ts-ignore
                  rangeVal: undefined,
               },
               rangeVal
            );
            const fixedStatusLogs = fixLogsStatus(res);
            // debugger;
            // setHistoryLogs([
            //      ...historyLogs,
            //      {
            //           corrector: "Rajapboyev Temurbek",
            //           _id: uuidV4(),
            //           editTime: moment(),
            //           before: logs,
            //           after: fixedStatusLogs,
            //      },
            // ]);
            setLogs(fixedStatusLogs);
         } else if (!currentLog?.isNewLog) {
            const timeCorrectedLogs = correctLogsTime(
               logs,
               // @ts-ignore
               currentLog,
               rangeVal
            );
            const fixedStatusLogs = fixLogsStatus(timeCorrectedLogs);
            // setHistoryLogs([
            //      ...historyLogs,
            //      {
            //           corrector: "Rajapboyev Temurbek",
            //           _id: uuidV4(),
            //           editTime: moment(),
            //           before: logs,
            //           after: fixedStatusLogs,
            //      },
            // ]);
            setLogs(fixedStatusLogs);
            // debugger;
         }
         setRangeVal(undefined);
      }
   };

   const onInsertDutyStatus = () => {
      let val = [
         Math.floor((totalTime - time / 1000 - 1.5 * 60 * 60) / 2),
         Math.floor((totalTime - time / 1000 + 1.5 * 60 * 60) / 2),
      ];
      console.log(logs);
      // debugger;
      const newLog: ILog = getNewLog(logs, time, val, fetchLogParams);
      setRangeVal(val);
      setLogs([...logs, newLog]);
      setCurrentLog(newLog);
   };

   return {
      state: {
         disableActions,
         // ... (other state variables)
         // Include other variables here
         // logStatus,
         currentLog,
         isVisibleInsertInfoLog,
         isLogsEdited,
         rangeVal,
         hoveredId,
         isFetching,
         transferStatus,
         editLogsLoading,
         infoLogFormData,
         log,
         columns: graphColumns,
         logData,
         logs,
         time,
         driverData,
         croppedTime,
         historyLogs: logData?.history,
         reportData: logData?.report,
         // ... (include other variables here)
      },
      actions: {
         onInsertInfoLogWithFormData,
         afterRangeChange,
         onCancel,
         onChangeStatus,
         onTimeChange,
         onInsertInfoLog,
         onNormalize,
         onTransfer,
         onRevert,
         onSend,
         onOk,
         onInsertDutyStatus,
         setCroppedTime,
         setTime,
         setLog,
         setHoveredId,
         filterDrawStatus,
         refetch,
         setCurrentLog,
         setInfoLogFormData,
         setIsVisibleInsertInfoLog,
         setLogs,
      },
   };
};
type IUseLogsInner = ReturnType<typeof useLogsInner>;

const LogsInnerContext = createContext<any>({});

const LogsInnerProvider = ({ children }: any) => {
   const value = useLogsInner();
   return (
      <LogsInnerContext.Provider value={value}>
         {children}
      </LogsInnerContext.Provider>
   );
};
const useLogsInnerContext = () => useContext<IUseLogsInner>(LogsInnerContext);
export { LogsInnerProvider, useLogsInnerContext };
