import { TItemStatus } from "./general.type";

export interface IDashboardMap {
    no: number;
    key: string;
    _id: string;
    currentStatus: TItemStatus;
    firstName: string;
    lastName: string;
    email: string;
    vehicleUnit: string;
    device?: {
        _id: string;
        time: number;
        vehicleId: string;
        distance: number;
        driverId: string;
        engHours: number;
        odometer: number;
        speed: number;
        state: string;
        systemTime: number;
        location: {
            _id: string;
            lat: number;
            lng: number;
            time: number;
        };
    };
}
