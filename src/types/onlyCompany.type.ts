export interface IOnlyCompanyForm {
    companyName: string;
    phone: string;
    usdot: string;
    companyAddress: string;
    homeTerminalTimezone: string;
    homeTerminalAddress: string;
}

export interface IOnlyCompanyData extends IOnlyCompanyForm {
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    _id: string;
}
