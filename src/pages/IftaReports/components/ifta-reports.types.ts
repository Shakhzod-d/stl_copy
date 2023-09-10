export interface IIftaCreateBody {
     type: string;
     name: string;
     recipient: string;
     status: string;
     from: number;
     to: number;
     vehicleId: number;
}
export interface IIftaCreateForm {
     type: string;
     vehicleId: string;
     states: string[];
}

export const IftaCreateFormNames = {
     type: "type",
     vehicleId: "vehicleId",
     states: "states",
};
