// Main pages
import { Dashboard } from "./pages/Dashboard";
import LogDrivers from "../src/pages/Logs";
import { Logs } from "@/track/pages/logs";
import LogsInner from "./pages/Logs/components";

import { LogsMap } from "@/track/pages/logs-map";
// Unit pages

// import Users from "./pages/Users";

// Admin pages
import AdminCompanies from "./pages/Admin/Companies";

// Report pages

import {
  ApiKeys,
  Histories,
  IftaReports,
  LogsDrivers,
  LogsLog,
  ManageCompany,
  Trackings,
  Transfer,
  Users,
  Violation,
} from "./track/pages";
import { Units } from "./track/pages/units/units";

import { Drivers } from "./track/pages/drivers";

import { TabCompany } from "./track/pages/tab-company";
import { CompanyUsers } from "./track/pages/company-users";

// Result pages
const routes = [
  {
    path: "/company",
    admin: "app",
    component: AdminCompanies,
  },

  {
    path: "/users",
    component: Users,
    admin: "app",
  },

  {
    path: "/main/dashboard",
    component: Dashboard,
    admin: "company",
  },

  {
    path: "/main/logs",
    component: Logs,
    admin: "company",
    route: [
      {
        path: "map",
        component: LogsMap,
        admin: "company",
      },
      {
        path: "drivers",
        component: LogDrivers,
        // component: LogsDrivers,
        admin: "company",
      },
      {
        path: "log",
        component: LogsLog,
        admin: "company",
      },
      {
        path: "violation",
        component: Violation,
        admin: "company",
      },
      {
        path: "tracking",
        component: Trackings,
        admin: "company",
      },

      {
        path: "inner/:id",
        component: LogsInner,
        admin: "company",
      },
    ],
  },
  {
    path: "/main/transfer",
    component: Transfer,
    admin: "company",
  },
  {
    path: "/main/ifta-reports",
    component: IftaReports,
    admin: "company",
  },
  {
    path: "/main/units",
    component: Units,
    admin: "company",
  },
  {
    path: "/main/drivers",
    component: Drivers,
    admin: "company",
  },
  {
    path: "/main/manage-company",
    component: ManageCompany,
    admin: "company",
    route: [
      { path: "company", component: TabCompany, admin: "company" },
      { path: "users", component: CompanyUsers, admin: "company" },
      { path: "keys", component: ApiKeys, admin: "company" },
      { path: "histories", component: Histories, admin: "company" },
    ],
  },
];

export default routes;
