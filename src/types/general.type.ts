import React from "react";

interface IRoute {
  component: React.FC;
  path: string;
  exact: boolean;
  status?: "app" | "admin" | "company";
}

interface INavStatus {
  dr: number;
  on: number;
  off: number;
  sb: number;
}

interface ICycle {
  break: number;
  cycle: number;
  drive: number;
  shift: number;
}

interface IDeviceInfo {
  time: number;
  driverId: string;
  vehicleId: string;
  STLConnection: boolean;
  bluetooth: boolean;
  gpsPermission: boolean;
  location: boolean;
  systemTime: number;
  battery: number;
  microphone: boolean;
  systemSound: boolean;
  storage: boolean;
  engHours: number;
  lat: number;
  lng: number;
  odometer: number;
  speed?: number;
  locationName?: string;
  currentStatus?: TItemStatus;
  _id: string;
}

type TItemStatus =
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

type TItemStatusInNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
type TFuelTypes =
  | "Diesel"
  | "Gasoline"
  | "Propane"
  | "Liquid Natural Gas"
  | "Compressed Natural Gas"
  | "Ethanol"
  | "Methanol"
  | "E-85"
  | "M-85"
  | "A55"
  | "Biodiesel"
  | "Other";

type IRoleName =
  | "superAdmin"
  | "serviceAdmin"
  | "secondServiceAdmin"
  | "companyAdmin"
  | "logger";

export type {
  ICycle,
  IDeviceInfo,
  INavStatus,
  IRoute,
  TFuelTypes,
  TItemStatus,
  TItemStatusInNumber,
  IRoleName,
};
