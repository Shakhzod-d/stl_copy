import { DriverStatus, TableAction, VehicleMakeModel } from "@/components/elements/TableElements";
import moment from "moment-timezone";
import useApiMutationID from "@/hooks/useApiMutationID";
import { IVoid } from "@/types";
import { IVehicleData } from "@/types/vehicle.type";

const useColumns = (refetch: IVoid) => {
     const { mutate } = useApiMutationID("DELETE", "/vehicle");
     const handleDeleteVehicle = (id: number) => {
          mutate({ id }, {
               onSuccess: () => refetch(),
          });
     };
     return [
          {
               title: "No",
               dataIndex: "no",
          },
          {
               title: "Vehicle Unit",
               dataIndex: "unit",
          },
          {
               title: "Driver",
               dataIndex: "driver",
               render: (driver: any) => `${driver.firstName} ${driver.lastName}`
          },
          {
               title: "Make/Model",
               render: VehicleMakeModel
          },
          {
               title: "License State",
               dataIndex: "licensePlateIssuingState",
          },
          {
               title: "ELD",
               dataIndex: "eid_device",
          },
          {
               title: "Address",
               dataIndex: "",
          },
          {
               title: "Notes",
               dataIndex: "notes",
          },
          {
               title: "VIN",
               dataIndex: "vin",
          },
          {
               title: "Status",
               dataIndex: "status",
               render: DriverStatus,
          },
          {
               title: "Created",
               dataIndex: "createdAt",
               render: (createdAt: string) =>
                    moment(createdAt).format("YYYY-MM-DD hh:mm"),
          },
          {
               title: "Updated",
               dataIndex: "updatedAt",
               render: (updatedAt: string) =>
                    moment(updatedAt).format("YYYY-MM-DD hh:mm"),
          },
          {
               title: "Actions",
               dataIndex: "_id",
               render: (id: number, order: IVehicleData) => {
                    return (
                         <TableAction
                              updatePush={`/units/vehicles/update/${id}`}
                              confirmTitle={`Do you want to deactivate ${order.make}`}
                              onDeleteConfirm={() => handleDeleteVehicle(id)}
                         />
                    );
               },
          },
     ];
};

export default useColumns;
