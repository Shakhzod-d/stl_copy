type IRoleName =
  | "superAdmin"
  | "serviceAdmin"
  | "secondServiceAdmin"
  | "companyAdmin"
  | "logger";
export interface IUserRole {
  roleId: string;
  roleName: IRoleName;
  _id: string;
}

export interface IUserForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: IUserRole;
  phone: string | null;
  companyId: string | null;
  serviceId: string | null;
}

export interface IUserData extends IUserForm {
  createdAt: string;
  updatedAt: string;
  refreshTime?: number;
  token?: string;
  _id: string;
  image: string | null;
}
