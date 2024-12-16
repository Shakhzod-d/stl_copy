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
import { Notification } from "./track/pages/notification/notification";
import { FinanceReports } from "./track/pages/finance-role/reports/reports";
import { InfoCompany } from "./track/pages/finance-role/info-company/info-company";
// Result pages
const routes = [
  {
    path: "/company",
    admin: ["superAdmin", "logger"],
    component: AdminCompanies,
  },

  {
    path: "/users",
    component: Users,
    admin: ["superAdmin", "logger"],
  },

  {
    path: "/main/dashboard",
    component: Dashboard,
    admin: ["superAdmin", "logger", "companyAdmin"],
  },

  {
    path: "/main/logs",
    component: Logs,
    admin: ["companyAdmin", "superAdmin"],
    route: [
      {
        path: "map",
        component: LogsMap,
        admin: ["companyAdmin", "superAdmin"],
      },
      {
        path: "drivers",
        component: LogDrivers,
        // component: LogsDrivers,
        admin: ["companyAdmin", "superAdmin"],
      },
      {
        path: "log",
        component: LogsLog,
        admin: ["companyAdmin", "superAdmin"],
      },
      {
        path: "violation",
        component: Violation,
        admin: ["companyAdmin", "superAdmin"],
      },
      {
        path: "q",
        component: Trackings,
        admin: ["companyAdmin", "superAdmin"],
      },

      {
        path: "inner/:id",
        component: LogsInner,
        admin: ["companyAdmin", "superAdmin"],
      },
    ],
  },
  {
    path: "/main/transfer",
    component: Transfer,
    admin: ["companyAdmin", "superAdmin"],
  },
  {
    path: "/notification",
    component: Notification,
    admin: ["companyAdmin", "superAdmin"],
  },
  {
    path: "/main/notification",
    component: Notification,
    admin: ["superAdmin"],
  },
  {
    path: "/main/ifta-reports",
    component: IftaReports,
    admin: ["companyAdmin",'superAdmin'],
  },
  {
    path: "/main/units",
    component: Units,
    admin: ["companyAdmin",'superAdmin'],
  },
  {
    path: "/main/drivers",
    component: Drivers,
    admin: ["companyAdmin",'superAdmin'],
  },
  {
    path: "/main/manage-company",
    component: ManageCompany,
    admin: ["companyAdmin",'superAdmin'],
    route: [
      { path: "company", component: TabCompany, admin: ["companyAdmin",'superAdmin'] },
      { path: "users", component: CompanyUsers, admin: ["companyAdmin",'superAdmin'] },
      { path: "keys", component: ApiKeys, admin: ["companyAdmin",'superAdmin'] },
      { path: "histories", component: Histories, admin: ["companyAdmin",'superAdmin'] },
    ],
  },
  {
    path: "/reports",
    component: FinanceReports,
    admin: ["logger"],
  },
  { path: "/info-company", component: InfoCompany, admin: ["logger"] },
];

export default routes;
