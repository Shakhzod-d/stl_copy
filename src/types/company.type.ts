export interface ICompanyForm {
  companyName: string;
  phone: string;
  usdot: string;
  companyAddress: string;
  homeTerminalTimezone: string;
  homeTerminalAddress: string;
  serviceId: string;
  logo: string;
}

export interface ICompanyData extends ICompanyForm {
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  serviceName: string;
  _id: string;
}

export interface CompanyForm {
  companyAddress: string;
  companyName: string;
  homeTerminalAddress: string;
  homeTerminalTimezone: string;
  mail: string;
  password: string;
  phone: string;
  usdot: string;
  zip: string;
  note: string;
  state: string;
}

export interface companyDriverEditData {
  role: string;
  open: boolean;
  id?: string;
  userRole?: string;
  refetch?: () => void;
}
