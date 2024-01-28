import { lazy } from "react";
import { IRoute } from "@/types";

// Main pages
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Logs = lazy(() => import("./pages/Logs"));
const LogsInner = lazy(() => import("./pages/Logs/components"));
const LogsByDriver = lazy(() => import("./pages/LogsByDriver"));
const LogErrors = lazy(() => import("./pages/LogErrors"));
const Trackings = lazy(() => import("./pages/Trackings"));
const TrackingsInner = lazy(() => import("./pages/Trackings/components/Inner"));

// Unit pages
const Drivers = lazy(() => import("./pages/Drivers"));
const DriversAction = lazy(() => import("./pages/Drivers/components/Action"));
const Vehicles = lazy(() => import("./pages/Vehicles"));
const VehiclesAction = lazy(() => import("./pages/Vehicles/components/Action"));
const Users = lazy(() => import("./pages/Users"));

// Admin pages
const AdminCompanies = lazy(() => import("./pages/Admin/Companies"));
const AdminDrives = lazy(() => import("./pages/Admin/Drives"));
const OnlyCompanies = lazy(() => import("./pages/Admin/OnlyCompanies"));
const AdminServices = lazy(() => import("./pages/Admin/Services"));
const AdminUsers = lazy(() => import("./pages/Admin/Users"));
const Profile = lazy(() => import("./pages/Profile"));

// Report pages

const IftaReports = lazy(() => import("./pages/IftaReports"));
const FMCSAReports = lazy(() => import("./pages/Reports/FMCSA/FMCSA"));
const DriverReports = lazy(() => import("./pages/Reports/DriverReports"));

// Result pages
const NotFound = lazy(() => import("./pages/404"));

const routes: IRoute[] = [
  {
    path: "/admin/services",
    component: AdminServices,
    exact: true,
    status: "admin",
  },
  /* {
        path: "/admin/only-companies",
        component: OnlyCompanies,
        exact: true,
        status: "admin",
    }, */
  {
    path: "/admin/all-companies",
    component: AdminCompanies,
    exact: true,
    status: "admin",
  },
  {
    path: "/admin/drivers",
    component: AdminDrives,
    exact: true,
    status: "admin",
  },
  {
    path: "/admin/users",
    component: AdminUsers,
    exact: true,
    status: "admin",
  },
  { path: "/profile", component: Profile, exact: true, status: "app" },
  {
    path: "/main/dashboard",
    component: Dashboard,
    exact: true,
    status: "app",
  },
  { path: "/main/log/logs", component: Logs, exact: true, status: "app" },
  {
    path: "/main/log/logs/inner/:id",
    component: LogsInner,
    exact: true,
    status: "app",
  },
  {
    path: "/main/log/driver",
    component: LogsByDriver,
    exact: true,
    status: "app",
  },
  {
    path: "/main/log/errors",
    component: LogErrors,
    exact: true,
    status: "app",
  },
  {
    path: "/main/trackings",
    component: Trackings,
    exact: true,
    status: "app",
  },
  {
    path: "/main/trackings/inner/:id",
    component: TrackingsInner,
    exact: true,
    status: "app",
  },
  { path: "/units/drivers", component: Drivers, exact: true, status: "app" },
  {
    path: "/units/drivers/create",
    component: DriversAction,
    exact: true,
    status: "app",
  },
  {
    path: "/units/drivers/update/:id",
    component: DriversAction,
    exact: true,
    status: "app",
  },
  {
    path: "/units/vehicles",
    component: Vehicles,
    exact: true,
    status: "app",
  },
  {
    path: "/units/vehicles/create",
    component: VehiclesAction,
    exact: true,
    status: "app",
  },
  {
    path: "/units/vehicles/update/:id",
    component: VehiclesAction,
    exact: true,
    status: "app",
  },
  { path: "/units/users", component: Users, exact: true, status: "app" },
  { path: "/units/users/:id", component: Users, exact: true, status: "app" },
  {
    path: "/reports/ifta-reports",
    component: IftaReports,
    exact: true,
    status: "app",
  },
  {
    path: "/reports/fmsca-reports",
    component: FMCSAReports,
    exact: true,
    status: "app",
  },
  {
    path: "/reports/driver-reports",
    component: DriverReports,
    exact: true,
    status: "app",
  },
  { path: "", component: NotFound, exact: false },
];

export default routes;
