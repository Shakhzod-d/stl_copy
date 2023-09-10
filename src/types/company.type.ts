export interface ICompanyForm {
    companyName: string;
    phone: string;
    usdot: string;
    companyAddress: string;
    homeTerminalTimezone: string;
    homeTerminalAddress: string;
    serviceId: string;
}

export interface ICompanyData extends ICompanyForm {
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    serviceName: string;
    _id: string;
}
