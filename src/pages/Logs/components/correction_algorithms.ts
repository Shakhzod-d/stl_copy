import { v4 as uuidV4 } from "uuid";
import moment from "moment-timezone";
import { POINT_STATUSES } from "./constants";
import { ILog } from "@/types/log.type";
import { IDriverData } from "@/types/driver.type";
export const fixLogsStatus = (logs: ILog[]): ILog[] => {
    const intermediateLogs: ILog[] = [];
    const result = logs
        .filter((log) => {
            if (POINT_STATUSES.includes(log.status)) {
                intermediateLogs.push(log);
                return false;
            } else return true;
        })
        .filter((log) =>
            log.start === log.end && log.duration === 0 ? false : true
        )
        .filter((log, i, array) => {
            const prevLog = array[i - 1];
            const nextLog = array[i + 1];
            if (
                prevLog &&
                log.status === prevLog.status &&
                nextLog?.status !== log.status
            ) {
                prevLog.end = log.end;
                return false;
            } else return true;
        })
        .filter((log, i, array) => {
            const nextLog = array[i + 1];
            if (nextLog && log.status === nextLog.status) {
                nextLog.start = log.start;
                return false;
            } else return true;
        });
    return sortLogsByTime(
        addIntermediateLogs([...result, ...intermediateLogs])
    );
};
export const addIntermediateLogs = (logs: ILog[]): ILog[] => {
    const intermediateLogs: ILog[] = [];
    logs.forEach((log) => {
        const range = log.end - log.start;
        const AN_HOUR = /* 1000 * */ 60 * 60;
        if (log.status === "dr" && range > AN_HOUR) {
            for (let i = AN_HOUR; i < range; i = i + AN_HOUR) {
                const ID = uuidV4();
                intermediateLogs.push({
                    ...log,
                    status: "intermediate",
                    start: log.start + i,
                    _id: ID,
                });
            }
        }
    });
    return [...logs, ...intermediateLogs];
};
export const insertInfoLog = (logs: ILog[], infoLog: ILog): ILog[] => {
    return logs;
};
export const correctLogsTime = (
    logs: ILog[],
    currLog: ILog,
    val: any
): ILog[] => {
    const intermediateLogs: ILog[] = [];
    let newLogs = logs
        .filter((log) => {
            if (POINT_STATUSES.includes(log.status)) {
                intermediateLogs.push(log);
                return false;
            } else return true;
        })
        .map((log, index) => {
            return { ...log, index: index };
        });
    const initialTime = newLogs[0].start;
    // @ts-ignore
    const currentLog: ILog = newLogs.find((log) => currLog._id === log._id);

    newLogs[currentLog.index] = {
        ...currentLog,
        start: val[0] + initialTime,
        end: val[1] + initialTime,
    };
    const isEndChanged = newLogs[currentLog.index].end !== currentLog.end;
    const isStartChanged = newLogs[currentLog.index].start !== currentLog.start;

    if (isEndChanged && currentLog.index !== newLogs.length - 1) {
        let lastNearest: ILog | undefined;
        let nextLog = newLogs.find((log, index) => index > currentLog.index);
        newLogs.forEach((log) => {
            if (log.start < val[1] + initialTime) {
                lastNearest = log;
            }
        });
        if (
            lastNearest &&
            lastNearest.index - 1 !== currentLog.index &&
            lastNearest.index !== currentLog.index
        ) {
            lastNearest.start = val[1] + initialTime;
            newLogs = newLogs.filter((log, index) => {
                if (
                    lastNearest &&
                    currentLog.index < index &&
                    index < lastNearest.index
                )
                    return false;
                else return true;
            });
        } else if (nextLog) nextLog.start = val[1] + initialTime;
    }
    if (isStartChanged && currentLog.index !== newLogs[0].index) {
        let firstNearest: ILog | undefined;
        const prevLog = newLogs[currentLog.index - 1];
        newLogs.forEach((log) => {
            if (log.start < val[0] + initialTime) {
                firstNearest = log;
            }
        });
        if (
            firstNearest &&
            firstNearest.index + 1 !== currentLog.index &&
            firstNearest.index !== currentLog.index
        ) {
            firstNearest.end = val[0] + initialTime;
            newLogs = newLogs.filter((log, index) => {
                if (
                    firstNearest &&
                    firstNearest.index < index &&
                    index < currentLog.index
                )
                    return false;
                else return true;
            });
        } else prevLog.end = val[0] + initialTime;
    }

    return sortLogsByTime([...newLogs, ...intermediateLogs]);
};
export const addNewLog = (
    logs: ILog[],
    newLogInitial: ILog,
    rangeVal: any
): ILog[] => {
    let _newLogs = logs.filter((log) => log._id !== newLogInitial._id);
    const intermediateLogs: ILog[] = [];
    _newLogs = sortLogsByTime([
        ..._newLogs.filter((log) => {
            if (POINT_STATUSES.includes(log.status)) {
                intermediateLogs.push(log);
                return false;
            } else return true;
        }),
        newLogInitial,
    ]);
    // @ts-ignore
    const newLog: ILog = _newLogs.find((log) => newLogInitial._id === log._id);
    const prevLog: ILog = _newLogs[newLog.index - 1];
    // @ts-ignore
    const nextLog: ILog = _newLogs.find((log) => log.end > newLog.end);
    const isAbove: boolean =
        (prevLog.start <= newLog.start && newLog.end <= prevLog.end) ||
        (nextLog.start <= newLog.start && newLog.end <= nextLog.end);

    if (isAbove) {
        const prevLogEnd = _newLogs[prevLog.index].end;
        _newLogs[prevLog.index].end = newLog.start;
        const IDForSeparatedLog = uuidV4();
        // const IDForSeparatedLog = logs.length;
        _newLogs.push({
            ...prevLog,
            _id: IDForSeparatedLog,
            start: newLog.end,
            end: prevLogEnd,
            duration: prevLogEnd - newLog.end,
            location: {
                lat: 0,
                lng: 0,
                name: "",
            },
        });

        return sortLogsByTime(
            addIntermediateLogs([..._newLogs, ...intermediateLogs])
        );
    }
    _newLogs[prevLog.index].end = newLog.start;
    _newLogs[nextLog.index].start = newLog.end;
    _newLogs = _newLogs.filter((log) =>
        log.start > newLog.start && log.start < newLog.end ? false : true
    );
    return sortLogsByTime([..._newLogs, ...intermediateLogs]);
};
export const sortLogsByTime = (logs: ILog[]): ILog[] =>
    logs
        .sort(
            (a, b) =>
                /* POINT_STATUSES.includes(a.status) ? -1 : */ a.start - b.start
        )
        .map((log, index) => {
            return { ...log, index: index };
        });
export const mapDataBeforeSend = (
    logs: ILog[],
    croppedTime?: [number, number],
    doCrop: boolean = true,
    driver?: IDriverData,
): any => {
    const sendData = [
        ...logs
            .map((log, index: number) => {
                return {
                    ...log,
                    duration: log.end - log.start,
                    vehicleId: driver?.vehicleId
                };
            })
            .filter((log) => (log.status === "intermediate" ? false : true)),
    ];
    if (doCrop && croppedTime) {
        sendData[0].start = croppedTime[0];
        sendData[sendData.length - 1].end = croppedTime[1];
    }
    return sendData;
};
export const getNewLog = (
    logs: any,
    initialTime: any,
    val: any,
    fetchLogParams: any
): ILog => {
    const _ID = uuidV4();
    // debugger
    return {
        start: initialTime / 1000 + val[0],
        end: initialTime / 1000 + val[1],
        _id: _ID,
        index: logs.length,
        status: "sb",
        location: {
            name: "",
            lat: 0,
            lng: 0,
        },
        vehicleId: "",
        odometer: 0,
        engineHours: 0,
        distance: 0,
        companyId: localStorage.getItem("companyId") || '',
        serviceId: "",
        coDriverId: "",
        driverId: fetchLogParams.driverId,
        duration: val[1] - val[0],
        trailer: "",
        document: "",
        notes: "",
        isNewLog: true,
        rangeVal: val,
    };
};
export const cropOneDayLogs = (
    logs: ILog[],
    initialTime: number
): { croppedLogs: ILog[]; croppedTime: [number, number] } => {
    const intermediateLogs: ILog[] = [];
    const croppedLogs = [...logs.map((log) => ({ ...log }))].filter((log) => {
        if (POINT_STATUSES.includes(log.status)) {
            intermediateLogs.push(log);
            return false;
        } else return true;
    });
    croppedLogs[0].start = initialTime;
    croppedLogs[0].isCropped = true;
    croppedLogs[0].cropPoint = "start";

    const isToday = initialTime === getTodaysInitialTime();

    if (!isToday) {
        croppedLogs[croppedLogs.length - 1].end = initialTime + 24 * 60 * 60;
        croppedLogs[croppedLogs.length - 1].isCropped = true;
        croppedLogs[croppedLogs.length - 1].cropPoint = "end";
    }

    return {
        croppedLogs: [...croppedLogs, ...intermediateLogs],
        croppedTime: [logs[0].start, logs[logs.length - 1].end],
    };
};

export const getTodaysInitialTime = () =>
    moment(moment().format("YYYY/MM/DD")).unix();
export const getTodaysSeconds = () => moment().unix() - getTodaysInitialTime();
export const getStartDay = (unix: number) => {
    const midnight = moment.unix(unix).startOf("day").unix();
    return midnight;
};
// "id": 8,
// "status": 2,
// "start": 1647457200000,
// "shift": 0,
// "hours": 0,
// "odometefewfwefwefr": 231,
// "engine_hours": 1647460570025,
// "trailers": "Treyler",
// "documents": "Prava",
// "notes": "Joyida",
// "odometr": 1230,
// "service": 1,
// "company": 1,
// "driver": 1,
// "co_driver": 1,
// "vehicle": 1,
// "location": {
//     "id": 0,
//     "lat": 0,
//     "lng": 0,
//     "name": ""
// }
