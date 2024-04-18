import { TFuelTypes } from "@/types";
import { SELECT_PAGE_LIMIT } from "./general.const";

const role_names = [
  {
    name: "Super admin",
    value: "superAdmin",
    forService: false,
    forCompany: false,
  },
  {
    name: "Service admin",
    value: "serviceAdmin",
    forService: true,
    forCompany: false,
  },
  {
    name: "Second service admin",
    value: "secondServiceAdmin",
    forService: true,
    forCompany: false,
  },
  {
    name: "Company admin",
    value: "companyAdmin",
    forService: true,
    forCompany: true,
  },
  {
    name: "Logger",
    value: "logger",
    forService: true,
    forCompany: true,
  },
];

const select_paging = { page: 1, limit: SELECT_PAGE_LIMIT };

const fuiel_types: TFuelTypes[] = [
  "Diesel",
  "Gasoline",
  "Propane",
  "Liquid Natural Gas",
  "Compressed Natural Gas",
  "Ethanol",
  "Methanol",
  "E-85",
  "M-85",
  "A55",
  "Biodiesel",
  "Other",
];

const issue_stats = [
  { label: "Eastern Time", value: "America/New_York" },
  { label: "Central Time", value: "America/Chicago" },
  { label: "Mountain Time", value: "America/Denver" },
  { label: "Pacific Time", value: "America/Los_Angeles" },
  { label: "Alaska Time", value: "America/Anchorage" },
  { label: "Hawaii-Aleutian Time", value: "Pacific/Honolulu" },
];

interface State {
  _id: number;
  label: string;
  value: string;
}

const state_names: State[] = [
  { _id: 1, label: "Alabama", value: "AL" },
  { _id: 2, label: "Alaska", value: "AK" },
  { _id: 3, label: "Arizona", value: "AZ" },
  { _id: 4, label: "Arkansas", value: "AR" },
  { _id: 5, label: "California", value: "CA" },
  { _id: 6, label: "Colorado", value: "CO" },
  { _id: 7, label: "Connecticut", value: "CT" },
  { _id: 8, label: "Delaware", value: "DE" },
  { _id: 9, label: "Florida", value: "FL" },
  { _id: 10, label: "Georgia", value: "GA" },
  { _id: 11, label: "Hawaii", value: "HI" },
  { _id: 12, label: "Idaho", value: "ID" },
  { _id: 13, label: "Illinois", value: "IL" },
  { _id: 14, label: "Indiana", value: "IN" },
  { _id: 15, label: "Iowa", value: "IA" },
  { _id: 16, label: "Kansas", value: "KS" },
  { _id: 17, label: "Kentucky", value: "KY" },
  { _id: 18, label: "Louisiana", value: "LA" },
  { _id: 19, label: "Maine", value: "ME" },
  { _id: 20, label: "Maryland", value: "MD" },
  { _id: 21, label: "Massachusetts", value: "MA" },
  { _id: 22, label: "Michigan", value: "MI" },
  { _id: 23, label: "Minnesota", value: "MN" },
  { _id: 24, label: "Mississippi", value: "MS" },
  { _id: 25, label: "Missouri", value: "MO" },
  { _id: 26, label: "Montana", value: "MT" },
  { _id: 27, label: "Nebraska", value: "NE" },
  { _id: 28, label: "Nevada", value: "NV" },
  { _id: 29, label: "New Hampshire", value: "NH" },
  { _id: 30, label: "New Jersey", value: "NJ" },
  { _id: 31, label: "New Mexico", value: "NM" },
  { _id: 32, label: "New York", value: "NY" },
  { _id: 33, label: "North Carolina", value: "NC" },
  { _id: 34, label: "North Dakota", value: "ND" },
  { _id: 35, label: "Ohio", value: "OH" },
  { _id: 36, label: "Oklahoma", value: "OK" },
  { _id: 37, label: "Oregon", value: "OR" },
  { _id: 38, label: "Pennsylvania", value: "PA" },
  { _id: 39, label: "Rhode Island", value: "RI" },
  { _id: 40, label: "South Carolina", value: "SC" },
  { _id: 41, label: "South Dakota", value: "SD" },
  { _id: 42, label: "Tennessee", value: "TN" },
  { _id: 43, label: "Texas", value: "TX" },
  { _id: 44, label: "Utah", value: "UT" },
  { _id: 45, label: "Vermont", value: "VT" },
  { _id: 46, label: "Virginia", value: "VA" },
  { _id: 47, label: "Washington", value: "WA" },
  { _id: 48, label: "West Virginia", value: "WV" },
  { _id: 49, label: "Wisconsin", value: "WI" },
  { _id: 50, label: "Wyoming", value: "WY" },
];

export { issue_stats, fuiel_types, state_names, role_names, select_paging };
