import { HiPhone } from "react-icons/hi2";
import { ObjType } from "../types/helper.type";

import { useDate } from "@/track/hooks/useDate";
import { IoMdMail } from "react-icons/io";
import { RiUser3Fill } from "react-icons/ri";
import { formatTime } from "./method";
function calculateDaysBetweenDates(startDate: string): number {
  // Sana: ISO formatidagi satrni Date ob'ektiga o'zgartirish
  const start = new Date(startDate);
  const endDate = new Date();
  // Har ikkala sana orasidagi farqni millisekundlarda hisoblash
  const differenceInTime = endDate.getTime() - start.getTime();

  // Millisekundlarni kunlarga o'zgartirish (millisekund -> sekund -> soat -> kun)
  const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

  return differenceInDays == 0 ? 1 : differenceInDays;
} // 3 kun

// Test qilish
export const mapUserData = (data: ObjType[]) => {
  return data?.map((item) => {
    const role = item["role"] as unknown as ObjType;
    console.log(item);

    const daysBetween = calculateDaysBetweenDates(String(item.updatedAt));
    return {
      _id: item._id,
      name: {
        label: `${item.firstName} ${item.lastName}`,
        img: "/company-logo.png",
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

interface DriversGet<T> {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  vehicleUnit: string;
  deviceInfo: string;
  status: string;
  cycle?: Cycle;
}

export function companyDrivers<T>(data: DriversGet<T>[] = []) {
  const drivers = data.map((item, i) => {
    return {
      id: i,
      f_name: item.firstName,
      l_name: item.lastName,
      u_name: item.username,
      co_driver: "",
      vehicle: item.vehicleUnit,
      driver_Type: "",
      app_version: "4.6.7",
      documents: "Not uploaded",
      activated: "2024-03-02",
      device_info: item.deviceInfo,
      action: "",
    };
  });

  const logDrivers = data.map((item) => {
    return {
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
    };
  });

  return { drivers, logDrivers };
}

export const dashboardData = (data: ObjType[] | []) => {
  data.map((item, i) => {
    return {
      key: i,
      name: `${item.firstName} ${item.lastName}`,
      violations: item.violation,
      date: "May 3, 2014",
      eld: "Connected",
      cycle: formatTime(Number(item.cycle)),
      company: item.companyName,
      updated: "3 minutes ago",
    };
  });
  return data;
};
