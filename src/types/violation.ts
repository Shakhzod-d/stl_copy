export interface IViolation {
  driver: {
    _id: string;
    isDeleted: false;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    phone: string;
    vehicleId: string;
    driverLicense: string;
    driverLicenseIssuingState: string;
    homeTerminalAddress: string;
    coDriverId: string;
    notes: string;
    organization: string;
    currentStatus: string;
    companyId: string;
    isActive: true;
    isBusy: false;
    createdAt: string;
    updatedAt: string;
    __v: number;
    deviceType: string;
    refreshTime: number;
  };
  cycle: {
    break: number;
    drive: number;
    shift: number;
    cycle: number;
  };
  Violations: {
    _id: string;
    driverId: string;
    date: number;
    violation: string;
    logId: string;
    status: string;
    createdAt: string;
  };
}
