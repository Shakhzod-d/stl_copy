import { HiPhone } from "react-icons/hi2";
import { Obj, ObjType } from "../types/helper.type";

import { useDate } from "@/track/hooks/useDate";
import { IoMdMail } from "react-icons/io";
import { RiUser3Fill } from "react-icons/ri";
import { formatTime } from "./method";
import { InnerTable, LogsFormData } from "@/types/log.type";
import { Checkbox } from "antd";
import { MdModeEdit } from "react-icons/md";
import { BsThreeDotsVertical, BsTruck } from "react-icons/bs";
import {
  DashboardData,
  DriersByLogsType,
  DriverCount,
  MapsType,
} from "../types";
import moment from "moment";
import { FaPowerOff } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import { TbMoonStars } from "react-icons/tb";
import { Select } from "../components/shared/custom-select";
function calculateDaysBetweenDates(startDate: string): number {
  const start = new Date(startDate);
  const endDate = new Date();

  const differenceInTime = endDate.getTime() - start.getTime();

  const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

  return differenceInDays === 0 ? 1 : differenceInDays;
}

function formattedTime(timestamp: number): string {
  const date = new Date(timestamp);
  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12; // 0 o'zgartirildi 12 ga
  const minutesStr = minutes < 10 ? "0" + minutes : minutes;
  const secondsStr = seconds < 10 ? "0" + seconds : seconds;

  return `${hours}:${minutesStr}:${secondsStr} ${ampm}`;
}

// Test qilish
export const mapUserData = (data: any[]) => {
  return data?.map((item) => {
    const role = item["role"] as unknown as ObjType;
    let image: string | undefined = "/assets/images/user-logo.png";
    if (item.image && item?.image !== "Not found image url") {
      image = item.image;
    }
    const daysBetween = calculateDaysBetweenDates(String(item.updatedAt));
    return {
      _id: item._id,
      name: {
        label: `${item.firstName} ${item.lastName}`,
        img: image,
        data: [{ id: 1, text: item.email }],
      },
      updated: { label: `${daysBetween} day ago` },
      carrier: {
        label: item.companyName,
      },
      status: {
        label: "Active",
      },

      role: {
        label: role["roleName"],
      },
      edit: { label: "Edit" },
    };
  });
};

export const mapCompanies = (data: ObjType[]) => {
  return data?.map((item) => {
    const createdAt = useDate(item && item?.createdAt);
    const edited = useDate(item && item.updatedAt);
    return {
      id: item._id,
      name: {
        label: item.companyName,
        img: "/company-logo.png",
        data: [
          { id: 1, text: item.phone, icon: <HiPhone /> },
          { id: 2, text: "support@asritsolutions.com", icon: <IoMdMail /> },
        ],
      },
      status: { label: item.isActive ? "Active" : "notActive" },
      contact: {
        label: "",
        data: [
          { id: 1, text: "Farmon Muhammadiyev (Owner)", icon: <RiUser3Fill /> },
          { id: 2, text: " (318) 818-0000", icon: <HiPhone /> },
          { id: 3, text: "zavajan96@gmail.com", icon: <IoMdMail /> },
        ],
      },
      created: {
        label: "",
        data: [
          { id: 1, text: `Created: ${createdAt}`, icon: "" },
          { id: 2, text: `Edited: ${edited}`, icon: "" },
        ],
      },
      edit: { label: "Edit" },
    };
  });
};

interface Cycle {
  break: number;
  drive: number;
  shift: number;
  cycle: number;
}

interface DriversGet {
  firstName: string;
  lastName: string;
  username: string;
  vehicleUnit: string;
  deviceInfo: string;
  status: string;
  cycle?: Cycle;
  _id?: string;
}

export function companyDrivers(data: DriversGet[] = []) {
  const drivers = data.map((item, i) => {
    return {
      id: i,
      f_name: item.firstName,
      l_name: item.lastName,
      u_name: item.username,
      co_driver: "",
      vehicle: item.vehicleUnit,
      app_version: "4.6.7",
      activated: "2024-03-02",
      // device_info: item.deviceInfo,
      action: "",
    };
  });

  const logDrivers = data.map((item, i) => {
    const fullName = `${i + 1} ${item.firstName} ${item.lastName}`;
    return {
      id: fullName,
      date: "1/1/2021",
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
    };
  });
  const LogsByDriver = data.map((item) => {
    return {
      driver: item.firstName + " " + item.lastName,
      driverId: item?._id,
    };
  });

  return { drivers, logDrivers, LogsByDriver };
}

function timeAgo(inputDate: string): string {
  const now = new Date();
  const date = new Date(inputDate);

  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) {
    return `${seconds} seconds ago`;
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes} minutes ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} hours ago`;
  }

  const days = Math.floor(hours / 24);
  if (days < 7) {
    return `${days} days ago`;
  }

  const weeks = Math.floor(days / 7);
  if (weeks < 4) {
    return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  }

  const months = Math.floor(days / 30); // Taxminan o'rtacha oy uzunligi
  if (months < 12) {
    return `${months} month${months > 1 ? "s" : ""} ago`;
  }

  const years = Math.floor(days / 365); // Taxminiy yil uzunligi
  return `${years} year${years > 1 ? "s" : ""} ago`;
}

export const dashboardData = (data: DashboardData[] | []) => {
  const result = data.map((item, i) => {
    const eld = item.driverInfo.eldConnection ? "Connected" : "Not connected",
      update = timeAgo(item.violations[0].updatedAt);
    const formattedDate = moment
      .unix(item.violations[0].date)
      .format("MMM D, YYYY");
    return {
      key: i,
      name: `${item.driverInfo.firstName} ${item.driverInfo.lastName}`,
      violations: item.violations[0].violation,
      date: formattedDate,
      eld,
      cycle: formatTime(Number(item.driverInfo.cycle)),
      company: item.driverInfo.companyName,
      updated: update,
    };
  });
  return result;
};

export const innerTable = (data: InnerTable[]) => {
  const result = data.map((item, i) => {
    const start = formattedTime(item.start);

    return {
      _id: i + 1,
      id: item._id,
      checkbox: <Checkbox></Checkbox>,
      status: item.status,
      start: start,
      duration: "12min 9sec",
      location: item.location.name,
      vehicle: item.vehicleUnit,
      odometer: item.odometer,
      hours: "10109.4",
      notes: item.notes,
      document: item.document,
      trailer: "v502269",
      add: <MdModeEdit color="blue" size={20} style={{ cursor: "pointer" }} />,
      dots: <BsThreeDotsVertical style={{ cursor: "pointer" }} />,
      lat: item.location.lat,
      lng: item.location.lng,
    };
  });
  return result;
};

export const LogsFormMap = (data: LogsFormData) => {
  return [
    { id: 1, title: "Driver", value: data.driver },
    { id: 2, title: "Distance", value: data.mile },
    { id: 3, title: "Co Driver", value: data.coDriver },
    { id: 4, title: "Truck", value: "105" },
    { id: 5, title: "Trailers", value: data.trailers },
    { id: 6, title: "Shipping docs", value: "N/A 11194RY9P" },
    { id: 7, title: "Signature", value: "Signed" },
  ];
};

export const driversCount = (data: any | DriverCount[] | []) => {
  // {status: 'dr', count: 0}
  // 1
  // :
  // {status: 'on', count: 0}
  // 2
  // :
  // {status: 'off', count: 11}
  // 3
  // :
  // {status: 'sb', count: 1}
  const activeClr: Obj = {
      off: "#5D5E5F",
      on: "#3DA8D5",
      dr: "#32BE61",
      sb: "#FC973A",
    },
    statusText: Obj = {
      off: "Off duty",
      dr: "Driving",
      on: "On duty",
      sb: "Sleeping",
    },
    icons: any = {
      off: (
        <FaPowerOff
          color="#b0b0b9"
          style={{ width: "48px", height: "48px", marginBottom: "15px" }}
        />
      ),
      on: (
        <GrUserAdmin
          color="#3DA8D5"
          style={{ width: "48px", height: "48px", marginBottom: "15px" }}
        />
      ),
      dr: (
        <BsTruck
          color="#32BE61"
          style={{ width: "48px", height: "48px", marginBottom: "15px" }}
        />
      ),
      sb: (
        <TbMoonStars
          color="#FC973A"
          style={{ width: "48px", height: "48px", marginBottom: "15px" }}
        />
      ),
    },
    activeData = data?.statusCount?.map(
      (item: { status: string; count: number }, i: number) => {
        return {
          id: i,
          text: statusText[item.status],
          count: item.count,
          color: activeClr[item.status],
          icon: icons[item.status],
        };
      }
    );
  const filterData = data?.statusCount?.map(
    (item: { status: string; count: number }, i: number) => {
      return {
        id: i,
        text: `${statusText[item.status]} ${item.count}`,
        color: activeClr[item.status],
      };
    }
  );
  return { activeData, filterData };
};

export const violationsPageData = (data: any[] | []) => {
  return data.map((item) => {
    return {
      driver: `${item.driver.firstName} ${item.driver.lastName}`,
      error: item.Violations.violation,
      status: item.driver.currentStatus,
      start: item.Violations.log.start,
      address: item.driver.address1,
      odometer: item.Violations.log.odometer,
      hours: item.Violations.log.engineHours,
    };
  });
};

// export const driverLogsMap(data:)

export const LogsByDriverMap = (data: DriersByLogsType[] | []) => {
  return data.map((item, i) => {
    const date = new Date(item.date * 1000);
    return {
      id: i + 1,
      date: `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`,
      truckNo: item.vehicleUnit,
      status: item.status,
      location: item.location.name,
      warnings: "",
      break: formatTime(item.cycle ? item.cycle.break : 0),
      drive: formatTime(item.cycle ? item.cycle.drive : 0),
      shift: formatTime(item.cycle ? item.cycle.shift : 0),
      cycle: formatTime(item.cycle ? item.cycle.cycle : 0),
      recap: "00:00",
      updated: timeAgo(item.updatedAt),
    };
  });
};

export const MapsData = (data: MapsType[] | []) => {
  return data.map((item, i) => {
    return {
      id: i,
      title: `${item.firstName} ${item.lastName}`,
      text: item.device ? item.device.location.name : "",
      lat: item.device ? item.device.location.lat : 0,
      lng: item.device ? item.device.location.lng : 0,
      desc: "Started: 03-11-2024, 02:13 EDT",
      status:
        item?.device?.speed && item.device.speed > 0
          ? `${item.device?.speed}mph`
          : item.currentStatus,
    };
  });
};
