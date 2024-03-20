import { ICycle, IDeviceInfo, TItemStatus } from "./general.type";
import { IViolation } from "./violation";

export interface IDriverForm {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  vehicleId: string; // ! number
  driverLicense: string;
  driverLicenseIssuingState: string;
  homeTerminalAddress: string;
  coDriverId: string ; // ! number
  notes: string;
  organization: string;
  fullName: string;
  coDriverUserName: string;
}

export interface IDriverData extends IDriverForm {
  _id: string;
  isActive: boolean;
  isBusy: boolean;
  createdAt: string;
  updatedAt: string;
  cycle: ICycle;
  status: {
    status: TItemStatus;
    _id: string;
  };
  deviceType: "android" | "ios";
  currentStatus: TItemStatus;
  deviceInfo?: IDeviceInfo;
  vehicleUnit: string;
  coDriverUserName: string;
  violations: IViolation["Violations"][];
  companyTimeZone: string;
  data: any;
}
