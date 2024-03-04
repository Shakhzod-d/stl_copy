import {
  AppVersion,
  TableAction,
  TableDeviceInfo,
  TableStatus,
} from "@/components/elements/TableElements/TableElements";
import useApiMutationID from "@/hooks/useApiMutationID";
import { IDriverData } from "@/types/driver.type";
import { IVoid } from "@/types";

const useColumns = (refetch: IVoid) => {
  const { mutate } = useApiMutationID("DELETE", "/driver");
  const handleDeleteDriver = (id: string) => {
    mutate({ id }, { onSuccess: () => refetch() });
  };
  return [
    {
      title: "No",
      dataIndex: "no",
    },
    {
      title: "First name",
      dataIndex: "firstName",
    },
    {
      title: "Last name",
      dataIndex: "lastName",
    },
    {
      title: "Username",
      dataIndex: "username",
    },
    {
      title: "Co Driver",
      dataIndex: "coDriver",
      render: (val: string) => val || "-",
    },
    {
      title: "Vehicle Unit",
      dataIndex: "vehicleUnit",
    },
    {
      title: "Address",
      dataIndex: "homeTerminalAddress",
    },
    {
      title: "Notes",
      dataIndex: "notes",
    },
    {
      title: "App version",
      dataIndex: "appVersion",
      render: AppVersion,
    },
    {
      title: "Activated",
      dataIndex: "status",
    },
    {
      title: "Terminated",
      dataIndex: "terminated",
    },
    {
      title: "Device",
      dataIndex: "deviceId",
      render: (id: number) => <>SM-T290 (30)</>,
    },
    {
      title: "Status",
      render: (row: IDriverData) => TableStatus(row?.isActive),
    },
    {
      title: "Device Info",
      dataIndex: "deviceInfo",
      render: TableDeviceInfo,
    },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (id: string, order: any) => (
        <TableAction
          updatePush={`/units/drivers/update/${id}`}
          confirmTitle={`Do you want to deactivate ${
            order.firstName + " " + order.lastName
          }`}
          onDeleteConfirm={() => handleDeleteDriver(id)}
        />
      ),
    },
  ];
};

export default useColumns;
