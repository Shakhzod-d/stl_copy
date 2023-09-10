export interface IVehicleForm {
    unit: string;
    make: string;
    model: string;
    vin: string;
    year: number;
    licensePlateNo: string;
    licensePlateIssuingState: string;
    fuelType: string;
    notes: string;
}

export interface IVehicleData extends IVehicleForm {
    isDeleted: false;
    _id: string;
    isBusy: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
