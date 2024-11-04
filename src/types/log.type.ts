import { ICycle, TItemStatus } from "./general.type";
import { IViolation } from "./violation";

export interface IMultidayLogs {
  logs: ILog[];
  day: number;
}
export interface ILogData {
  cycle: ICycle;
  history: IHistoryLog[];
  log: ILog[];
  report: IReport;
  originalLog: ILog[];
  violation: IViolation["Violations"][];
  lastCertify: {
    _id: string;
    driverId: string;
    date: number;
    isSigned: true;
    signatureImg: string;
    createdAt: string;
    updatedAt: string;
  };
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

export interface IHistoryLog {
  _id: string;
  afterLogs: ILog[];
  beforeLogs: ILog[];
  createdAt: string;
  date: "2022-11-14";
  driverId: number;
  updatedAt: string;
  user: string;
}

export interface IReport {
  _id: string;
  firstName: string;
  lastName: string;
  vehicleId: string;
  driverLicense: string;
  driverLicenseIssuingState: string;
  homeTerminalAddress: string;
  coDriver: string;
  notes: string;
  organization: string;
  companyId: string;
  carrier: string;
  mainOfficeAddress: string;
  mainTerminalAddress: string;
  vehicleVin: string;
  currentStatus: TItemStatus;
  trailers: string;
  distance: number;
  shippingDocs?: string;
  malfunctionIndicators: string;
  dataDiagnostics: string;
  unidentifiedDriverRecords: string;
  exemptDriverStatus: string;
  usdot: number;
  TMKId: string;
  currentLocation?: {
    lat: number;
    lng: number;
    name?: string;
  };
}

export interface IIntermediateLog {
  key: any;
  id: any;
  number: number;
  index: number;
  name: string;
  status: "intermediate";
  start: number;
  location: {
    name: string;
    lat: string | number;
    lng: string | number;
  };
  vehicle: string;
  odometer: string;
  hours: number;
  trailers: string;
  document: string;
  notes: string;
  rangeVal?: any;
}

export interface IInfoLog {
  key: any;
  id: any;
  number: number;
  status: "intermediate" | "infoLog";
  index: number;
  name: string;
  start: number;
  location: {
    name: string;
    lat: string | number;
    lng: string | number;
  };
  vehicle: string;
  odometer: string;
  hours: number;
  trailers: string;
  document: string;
  notes: string;
  rangeVal?: any;
}

export interface InnerTable {
  coDriverId: string;
  companyId: string;
  createdAt: string;
  distance: number;
  document: string;
  driverId: "6707d10ce91290665289fc67";
  duration: number | string;
  end: number;
  engineHours: number;
  hasCycle: boolean;
  hasFlag: boolean;
  isDeleted: boolean;
  isEnded: boolean;
  isFirst: boolean;
  location: {
    lat: number;
    lng: number;
    name: string;
    _id: string;
    status: string;
  };
  notes: string;
  odometer: number;
  origin: string;
  start: number;
  status: string;
  trailer: string;

  updatedAt: string;
  vehicleId: string;
  vehicleUnit: string;
  __v: number;
  _id: string;
}
export interface LogTableData {
  id: string;
  checkbox: any;
  status: string;
  start: string;
  duration: string;
  location: string;
  vehicle: string;
  odometer: number;
  hours: string;
  notes: string;
  document: string;
  trailer: string;
  add: any;
  dots: any;
  lat: number;
  lng: number;
}

export interface LogsFormData {
  coDriver: null | string | undefined;
  createdAt: string;
  documents: string;
  driver: string;
  mile: number;
  notes: string;
  signature: string;
  trailers: string;
  updatedAt: string;
  vehicleUnit: string;
  _id: string;
}

export interface FormData {
  id: number;
  title: string;
  value: unknown;
}
