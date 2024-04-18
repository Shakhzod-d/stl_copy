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
import { useLocation, useParams } from "react-router-dom";
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
  sortLogsByTime,
} from "./correction_algorithms";
import { useDispatch } from "react-redux";
import { postInsertInfoLog, putCertify } from "@/store/slices/logSlice";
import { AppDispatch } from "@/store";

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
  const [,] = useState();
  const [ids, setIds] = useState<{ _id1: string; _id2: string; time: number }>({
    _id1: "",
    _id2: "",
    time: 0,
  });
  const [isAlreadyClicked, setIsAlreadyClicked] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const s = useLocation();

  // inputString.replace(/(inner\/).*$/, '$1') /\/([^/]+)$/.exec(inputString)?.[1]
  // console.log(`currentLog`, currentLog);
  // console.log(/\/([^/]+)$/.exec(s?.pathname)?.[1]);

  const handleEditClick = (log: any) => {
    const rowIndex = logs.findIndex((item) => item._id === log._id);
    // setCurrentLog(log);
    // console.log(`currentLog`, logs, log);
    // @ts-ignore

    const newData = [...logs];
    newData.splice(rowIndex + 1, 0, log);
    setLogs(newData);
  };

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
      setLog(currentLog)
    } else if (!currentLog) {
    }
  }, [currentLog]);

  const onInsertInfoLogWithFormData = (formData: ILog) => {
    setInfoLogFormData(formData);
    setIsVisibleInsertInfoLog(true);
  };

  const graphColumns = useGraphColumns(
    handleEditClick,
    currentLog,
    setCurrentLog,
    onInsertInfoLogWithFormData,
    logs,
    setLogs
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
    setRangeVal([range[0].unix() - time / 1000, range[1].unix() - time / 1000]);
    // @ts-ignore
    setCurrentLog({
      ...currentLog,
      rangeVal: [range[0].unix() - time / 1000, range[1].unix() - time / 1000],
    });
  };

  const onInsertInfoLog = (infoLog: IInsertInfoLogFormData, status: string) => {
    const newLogObj = {
      ...infoLog,
      _id: uuidV4(),
      coDriverId: "",
      driverId: /\/([^/]+)$/.exec(s?.pathname)?.[1],
      start: infoLog.start,
      end: infoLog.end,
      status: infoLog.status || "login",
      engineHours: Number(infoLog.engineHours) || 0,
      odometer: Number(infoLog.odometer) || 0,
      distance: 0,
      document: "",
      notes: "",
      trailer: "",
      serviceId: "",
      vehicleUnit: "",
      location: {
        lat: Number(infoLog?.lat?.split(",")[0]) || 0,
        lng: Number(infoLog?.lat?.split(",")[1]) || 0,
        name: "",
      },
      origin: "Auto",
      handleLogItems
    }; 

    if (status === "certify") {
      dispatch(putCertify(infoLog));
    } else {
      dispatch(postInsertInfoLog(newLogObj));
    }
    
  };

  const handleLogItems = (data: any) => {
    setLogs(sortLogsByTime([...logs, data]));
  }

  const onNormalize = () => {};

  const onTransfer = (duration: number, log: ILog) => {

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
          afterLogs: mapDataBeforeSend(logs, [0, 0], false, driverData!.data),
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
  // console.log(
  //   rangeVal,
  //   hoveredId,
  //   isFetching,
  //   transferStatus,
  //   editLogsLoading,
  //   infoLogFormData,
  //   log,
  //   // columns,
  //   logData,
  //   logs,
  //   time,
  //   driverData
  // );

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
        setLogs(fixedStatusLogs);
      } else if (!currentLog?.isNewLog) {
        const timeCorrectedLogs = correctLogsTime(
          logs,
          // @ts-ignore
          currentLog,
          rangeVal
        );
        const fixedStatusLogs = fixLogsStatus(timeCorrectedLogs);
        setLogs(fixedStatusLogs);
        // debugger;
      }
      setRangeVal(undefined);
    }
  };

  const onInsertDutyStatus = () => {
    setIsAlreadyClicked(true);
    let val = [
      Math.floor((totalTime - time / 1000 - 1.5 * 60 * 60) / 2),
      Math.floor((totalTime - time / 1000 + 1.5 * 60 * 60) / 2),
    ];
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
      logs: logs.map((item: any) => ({
        ...item,
        location: { ...item.location, status: item.status },
      })),
      time,
      driverData,
      croppedTime,
      historyLogs: logData?.history,
      reportData: logData?.report,
      ids,
      isAlreadyClicked,
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
      setIds,
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
