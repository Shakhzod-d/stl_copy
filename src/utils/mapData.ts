import { ICompanyData } from "@/types/company.type";
import { POINT_STATUSES } from "../pages/Logs/components/constants";
import {
  // IFakeJsonData,
  // IFakeJsonData2,
  TItemStatus,
  TItemStatusInNumber,
} from "@/types/general.type";
import { IServiceData } from "@/types/service.type";
import { IDriverData } from "@/types/driver.type";
import { IVehicleData } from "@/types/vehicle.type";
import { IHistoryLog, ILog } from "@/types/log.type";
import { formatTime } from "@/track/utils/method";

const mapService = (data: IServiceData[]): IServiceData[] => {
  return data.map((el) => {
    return {
      ...el,
      key: el._id,
    };
  });
};

const mapCompanies = (data: ICompanyData[]) => {
  return data?.map((el: any, i: number) => {
    return {
      ...el,
      key: el._id,
      drivers: el.drivers || 0,
    };
  });
};

const mapDrivers = (data: IDriverData[]) => {
  if (!data) return [];
  return data?.map((el, i: number) => {
    return {
      ...el,
      key: el._id,
      no: i + 1,
      name: el.firstName + " " + el.lastName,
      locationName: el?.deviceInfo?.locationName,
      fullName: `${el.firstName} ${el.lastName}`,
      // status: "active", // ! el.status === 1 ? "active" : "inactive",
    };
  });
};

const mapVehicles = (data: IVehicleData[]) => {
  return data?.map((el, i: number) => {
    return {
      ...el,
      key: el._id,
      no: i + 1,
      make: `${el.make}/${el.model}`,
      status: "active", // el.status === 1 ? "active" : "inactive",
    };
  });
};
//                            👇👉ILog[]
const mapDriverLogs = (data: ILog[]): ILog[] => {
  const result = data
    // .filter((log) => log.status !== "logout")
    .map((log, i: number) => {
      // const interLogs: ILog[] = [];// const result: ILog[] = data.map((log: IFakeJsonData2, i: number) => {
      const getItemStatus = (
        statusNumber: TItemStatusInNumber
      ): TItemStatus => {
        switch (statusNumber) {
          case 1:
            return "on";
          case 2:
            return "dr";
          case 3:
            return "sb";
          case 4:
            return "off";
          case 7:
            return "off_pc";
          case 6:
            return "on_ym";
          case 5:
            return "intermediate";
          default:
            return "off";
        }
      };
      return {
        ...log,
        index: i,
        number: i + 1,
        duration: POINT_STATUSES.includes(log.status)
          ? 0
          : Math.abs(log.duration),

        // status: log.status,
        // location: log.location,
        // notes: log.notes,
        isNewLog: false,
        // location: {
        //      name: "Tashkent",
        //      lat: 21,
        //      lng: 22,
        // },
        isCropped: false,
      };

      // return {
      //      key: log._id,
      //      id: log._id,
      //      index: i,
      //      number: i + 1,
      //      name: log.driver,
      //      status: log.status,
      //      start: Number(log.created_at),
      //      end: Number(log.created_at + log.hours),
      //      location: log.location,
      //      odometer: log.odometer,
      //      hours: Number(log.hours),
      //      document: log.documents,
      //      notes: log.notes,
      //      vehicle: log.vehicle,
      //      trailers: log.trailers,
      //      isNewLog: false,
      // };
    });
  return result;
};
const mapHistoryLogs = (data: IHistoryLog[]): IHistoryLog[] => {
  return data.filter((historyLog) =>
    historyLog.afterLogs.length === 0 || historyLog.beforeLogs.length === 0
      ? false
      : true
  );
};

const mapTableData = (data: any[]) => {
  return data?.map((item, i: number) => {
    const fullName = `${i + 1} ${item.firstName} ${item.lastName}`;
    // console.log(item);

    return {
      _id: fullName,
      id: item?._id,
      date: "1/1/2020",
      truckNo: 2358,
      status: item.status,
      location: "835, Trần Hưng Đạo",
      warnings: "No Signature!",
      break: formatTime(item.cycle ? item.cycle.break : 0),
      drive: formatTime(item.cycle ? item.cycle.drive : 0),
      shift: formatTime(item.cycle ? item.cycle.shift : 0),
      cycle: formatTime(item.cycle ? item.cycle.cycle : 0),
      recap: "00:00",
      updated: "13 weeks ago",
      Date: item.violations[0].date,
    };
  });
};

const mapBusyDisable = (data?: any[]) => {
  if (data)
    return data.map((item) => {
      return {
        ...item,
        disabled: item.isBusy,
      };
    });
  else return [];
};

export {
  mapService,
  mapCompanies,
  mapDrivers,
  mapVehicles,
  mapDriverLogs,
  mapHistoryLogs,
  mapTableData,
  mapBusyDisable,
};
