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
  id: number;
  title: string;
  text: string;
  status: string;
  desc: string;
  time?: string;
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
  isEnded?: true;
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

export interface DashboardData {
  _id: string;
  driverId: string;
  companyId: string;
  date: number;
  violation: string;
  done: boolean;
  logId: null | string;
  status: null | string;
  cycle: number;
  firstName: null | string;
  lastName: null | string;
  companyName: null | string;
}
