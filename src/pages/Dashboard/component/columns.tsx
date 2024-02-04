import {
  DriverStatus,
  ClipLocation,
  TableDeviceInfo,
} from "@/components/elements/TableElements";
import { IDashboardMap } from "@/types/dashbord.type";

/**
 * 
 * @returns 
    "_id": "655b4cba472d9efccd5958d7",
    "time": 1700456400,
    "vehicleId": "6516df9602d0aec7dc7c15bb",
    "battery": 35,
    "bluetooth": true,
    "STLConnection": false,
    "gpsPermission": true,
    "location": true,
    "systemTime": 1700482230

 */

const useColumns = () => {
  return [
    {
      title: "No",
      dataIndex: "no",
    },
    {
      title: "Status",
      dataIndex: "currentStatus",
      render: DriverStatus,
    },
    {
      title: "Driver",
      render: (order: IDashboardMap) => `${order.firstName} ${order.lastName}`,
    },
    {
      title: "Truck Unit",
      dataIndex: "vehicleUnit",
    },
    {
      title: "Last ST. Position",
      render: (order: IDashboardMap) =>
        order.device ? order.device.state : "-",
    },
    {
      title: "Location",
      dataIndex: "position",
      render: ClipLocation,
    },
    {
      title: "Current SPD",
      render: (order: IDashboardMap) =>
        order.device ? `${order.device.speed} mph` : "-",
    },
    {
      title: "Device Info",
      dataIndex: "mobile",
      render: TableDeviceInfo,
    },
  ];
};

const fakeData = [
  {
    no: "1",
    key: "1",
    id: "1",
    status: "on",
    driver: "Nodir Abdunazarov",
    track: "18",
    positionTitle: "0.88 mi E of Dayton, OH",
    speed: "102 mph",
    position: {
      lat: 39.761379,
      lng: -84.200629,
    },
    date: "12/02/2022",
    odometr: "312312",
  },
  {
    no: "2",
    key: "2",
    id: "2",
    status: "sb",
    driver: "Elbek Mirzayev",
    track: "22",
    positionTitle: "Richland Township",
    speed: "89 mph",
    position: {
      lat: 39.754451,
      lng: -84.15646,
    },
    date: "21/03/2022",
    odometr: "543234",
  },
  {
    no: "3",
    key: "3",
    id: "3",
    status: "dr",
    driver: "Davron Alibekov",
    track: "05",
    positionTitle: "Ripley Township",
    speed: "115 mph",
    position: {
      lat: 39.78507,
      lng: -84.172374,
    },
    date: "07/07/2022",
    odometr: "315464",
  },
];

export { useColumns, fakeData };
