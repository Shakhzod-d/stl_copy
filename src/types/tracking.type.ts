export interface ITracking {
    _id: string;
    isDeleted: boolean;
    time: number;
    driverId: string;
    vehicleId: string;
    location: {
        lat: number;
        lng: number;
        time: number;
        _id: string;
    }[];
    odometer: -1;
    engHours: number;
    systemTime: number;
    speed: number;
    state: string;
    switchState: false;
    distance: number;
    __v: number;
    createdAt: string;
    updatedAt: string;
}
