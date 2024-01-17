import { IRoleName } from "./general.type";

export interface IUserForm {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: IRoleName;
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
}
