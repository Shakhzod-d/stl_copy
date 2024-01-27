import { Fragment } from "react";
import { logoutUser } from "@/utils";
import { MenuProps } from "antd";
import { Link } from "react-router-dom";
import Icon from "@/components/icon/Icon";
import ResourceIcon from "../assets/ResourceIcon";
import FeedBackIcon from "../assets/FeedbackIcon";
import LogoutIcon from "../assets/LogoutIcon";
import Fmcsa from "../assets/Fmcsa";
import IFTA from "../assets/IFTA";

type MenuItem = Required<MenuProps>["items"][number];

const generateSiderLink = (label: string, path: string) => {
  return (
    <Fragment>
      {label}
      <Link to={path} />
    </Fragment>
  );
};

const sider: MenuItem[] = [
  {
    key: "main",
    label: "main",
    type: "group",
    children: [
      {
        key: "dashboard",
        label: generateSiderLink("All units", "/main/dashboard"),
        icon: <Icon icon="map" />,
      },
      {
        key: "log",
        label: generateSiderLink("Logs", "/main/log/logs"),
        icon: <Icon icon="storage" />,
      },
      {
        key: "trackings",
        label: generateSiderLink("Trackings", "/main/trackings"),
        icon: <Icon icon="shipping" />,
      },
    ],
  },
  {
    key: "units",
    label: "units",
    type: "group",
    children: [
      {
        key: "drivers",
        label: generateSiderLink("Drivers", "/units/drivers"),
        icon: <Icon icon="driver" />,
      },
      {
        key: "vehicles",
        label: generateSiderLink("Vehicles", "/units/vehicles"),
        icon: <Icon icon="shipping" />,
      },
      {
        key: "users",
        label: generateSiderLink("Users", "/units/users"),
        icon: <Icon icon="group" />,
      },
    ],
  },
  {
    key: "reports",
    label: "reports",
    type: "group",
    children: [
      {
        key: "ifta-reports",
        label: generateSiderLink("IFTA Reports", "/reports/ifta-reports"),
        // icon: <Icon icon="equalizer" />, // IFTA
        icon: <IFTA />,
      },
      {
        key: "fmsca-reports",
        label: generateSiderLink("FMCSA Reports", "/reports/fmsca-reports"),
        //    icon: <Icon icon="equalizer" />,
        icon: <Fmcsa />,
      },
      {
        key: "driver-reports",
        label: generateSiderLink("Driver Reports", "/reports/driver-reports"),
        icon: <Icon icon="equalizer" />,
      },
    ],
  },
  {
    key: "communication",
    label: "communication",
    type: "group",
    children: [
      {
        key: "recourses",
        label: generateSiderLink("Recourses", "/communication/recourses"),
        icon: <ResourceIcon />,
      },
      {
        key: "feedback",
        label: generateSiderLink("Feedback", "/communication/feedback"),
        icon: <FeedBackIcon />,
      },
      {
        key: "logout",
        label: "Logout",
        icon: <LogoutIcon />,
        onClick: logoutUser,
      },
    ],
  },
];

export default sider;
