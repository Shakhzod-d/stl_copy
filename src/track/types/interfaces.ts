import { ReactNode } from "react";
import { IUserData } from "./user.type";

export interface LoginData {
  login: string;
  password: string;
}
export interface SelectData {
  value: string | unknown;
  label: string;
}
export interface ILoginData {
  data: IUserData;
}
export type ISetState<S> = React.Dispatch<React.SetStateAction<S>>;
export type TItemStatus =
  | "on"
  | "dr"
  | "sb"
  | "off"
  | "off_pc"
  | "on_ym"
  | "intermediate"
  | "login"
  | "logout"
  | "power_off"
  | "power_on";
export type RangeLogStatus = "on" | "dr" | "sb" | "off" | "off_pc" | "on_ym";
export interface IOption<T> {
  name: string;
  value: T;
}
export interface IftaReportColumns {
  key: string;
  vehicle: string;
  state: string;
  melis: string;
}
export interface ArticleProps {
  desc: string;
  id: number;
  lat: number;
  lng: number;
  text: string;
  title: string;
  status: string;
}

export interface ILog {
  coDriverId: string;
  companyId: string;
  createdAt?: string;
  distance: number;
  document: string;
  driverId: string;
  duration: number;
  end: number;
  engineHours: number;
  hasCycle?: false;
  hasFlag?: false;
  isDeleted?: false;
  isEnded?: boolean;
  isFirst?: false;
  location: { lat: number; lng: number; name: string; _id?: string };
  notes: string;
  odometer: number;
  serviceId: string;
  start: number;
  status: TItemStatus;
  trailer: string;
  updatedAt?: string;
  vehicleId?: string;
  vehicleUnit?: string;
  __v?: number;
  _id?: string;

  index: number;
  isCropped?: boolean;
  cropPoint?: string;
  isNewLog: boolean;
  rangeVal: [number, number];

  startOdometer?: number;
  endOdometer?: number;
  odometerDuration?: number;
}

export interface DriversData {
  id: string;
  f_name: string;
  l_name: string;
  u_name: string;
  co_driver: "";
  vehicle: string;
  driver_Type: string;
  app_version: string;
  documents: string;
  activated: string;
  device_info: string;
  action: "";
}

export interface DriversGet<T> {
  [key: string]: T;
}

interface CompaniesArr {
  id: number | string;
  text: string;
  icon?: JSX.Element | "";
}
export interface CompanyData {
  id: string | number;
  name: {
    label: string;
    img: string | undefined;
    data?: CompaniesArr[];
  };
  status: { label: string };
  contact?: {
    label: string;
    data?: CompaniesArr[];
  };
  created: {
    label: string;
    data: CompaniesArr[];
  };
  edit: { label: string };

  // Qo'shimcha index signature
  [key: string]: any;
}

export interface UserData {
  id?: string;

  name: {
    label: string;
    img: string;
    data: [{ id: number; text: string }];
  };
  updated: { label: string };
  status: {
    label: string;
  };
  carrier: {
    label: string;
  };
  role: {
    label: string;
  };
  edit: { label: string };
}

export interface InfoTableData {
  id: string | number;
  name: {
    label: string;
    img: string | undefined;
    data?: CompaniesArr[];
  };
  // Allows other properties, but excludes `id` and `name` from the dynamic type
  [key: string]:
    | { label: string | number }
    | string
    | number
    | { label: string; img: string; data?: CompaniesArr[] };
}

export interface ViolationsData {
  _id: string;
  isDeleted: boolean;
  driverId: string;
  companyId: string;
  date: number;
  violation: string;
  done: boolean;
  logId: string | null | number;
  status: string | null | number;
  cycle: number;
  __v: number;
  createdAt: string;
  updatedAt: string;
}
export interface DriverData {
  firstName: string;
  lastName: string;
  lastUpdated: string;
  companyName: string;
  eldConnection: boolean;
  cycle: number;
}
export interface DashboardData {
  driverInfo: DriverData;
  driverId: string;
  violations: ViolationsData[];
}

export interface DriverCount {
  status: string;
  count: number;
}

export interface DriersByLogsType {
  _id: string;
  isDeleted: boolean;
  driverId: string;
  start: number;
  end: number;
  duration: number;
  status: string;
  engineHours: number;
  odometer: number;
  distance: number;
  document: string;
  notes: string;
  trailer: string;
  companyId: string;
  vehicleId: string;
  vehicleUnit: string;
  coDriverId: string;
  location: {
    lat: number;
    lng: number;
    name: string;
    _id: string;
  };
  hasFlag: boolean;
  hasCycle: boolean;
  isFirst: boolean;
  isEnded: boolean;
  origin: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  date: number;
  EldLocation: any;
  cycle: {
    break: number;
    drive: number;
    shift: any | number;
    cycle: number;
  };
  violations:
    | [
        {
          _id: string;
          driverId: string;
          __v: any;
          companyId: string;
          createdAt: string;
          cycle: number;
          date: string;
          done: boolean;
          isDeleted: boolean;
          logId: any;
          status: any;
          updatedAt: string;
          violation: string;
        }
      ]
    | [];
}

export interface MapsType {
  _id: number;
  firstName: string;
  lastName: string;
  email: string;
  currentStatus: string;
  vehicleUnit: number | string;
  device: {
    _id: string;
    time: number;
    vehicleId: string;
    systemTime: number;
    state: string;
    distance: number;
    odometer: number;
    engHours: number;
    speed: number;
    location: {
      lat: number;
      lng: number;
      name: string;
      time: number;
      _id: number;
    };
  } | null;
  mobile: {
    _id: string;
    time: number;
    vehicleId: string;
    battery: number;
    bluetooth: boolean;
    eldConnection: boolean;
    gpsPermission: true;
    location: boolean;
    systemTime: number;
  } | null;
}
