export interface IServiceForm {
    name: string;
    dotNumber: string;
    phone: string;
    homeTerminalAddress: string;
    homeTerminalTimezone: string;
    address: string;
}

export interface IServiceData extends IServiceForm {
    _id: string;
    serviceId: string;
    phone: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    companiesCount: number;
    driversCount: number;
    trucksCount: number;
}
