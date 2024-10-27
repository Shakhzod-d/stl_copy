import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from "./localStorage";
import { setTheme } from "./dispatch";
import { ThemeProps } from "@/types";
import routes from "../routes";

import moment from "moment-timezone";

// filter routes for layouts
const filterRoutes = (status: string) => {
  return routes.filter((el: any) => el.status === status || !el.status);
};

// logout user function
const logoutUser = () => {
  localStorage.clear();
  window.location.reload();
  window.location.href = "/";
};

// enter as company
// const enterAsCompany = (id: number) => {
//     const navigate =useNavigate()
//     setLocalStorage("company_id", id);
//     ("/main/dashboard");
// };

// find the corresponding word
const compareWords = (key: string, array: string[]) => {
  return array.includes(key);
};

// get initial collapse value from localStorage
const localCollapsed = () => {
  const collapsed = getLocalStorage("collapsed") as string;
  return JSON.parse(collapsed) || false;
};

// change platform theme
const changeTheme = (theme: ThemeProps) => {
  const body = document.body;
  setTheme(theme);
  setLocalStorage("theme", theme);
  body.className = theme;
};

// generate years until now
const generateYear = () => {
  let starter = 1999;
  let now = new Date().getFullYear();
  let years = [];
  while (starter <= now) {
    years.push(String(starter));
    ++starter;
  }
  return years;
};

// convert hex color to rgba color
const hexToRgba = (hex: any, alpha = 1) => {
  const [r, g, b] = hex.match(/\w\w/g).map((x: any) => parseInt(x, 16));
  return `rgba(${r},${g},${b},${alpha})`;
};

// get duration date
const getDurationDate = (start: number, end: number) => {
  const format = "MM/DD/YYYY HH:mm:ss";
  const startTime = moment(start);
  const endTime = moment(end);
  const countDownStart = startTime.add(0, "second");
  const then = moment(countDownStart).format(format);
  const now = moment(endTime).format(format);
  const ms = moment(now, format).diff(moment(then, format));
  const duration = moment.duration(ms);
  const hours = duration.get("hours");
  const minutes = duration.get("minutes");
  const seconds = duration.get("seconds");
  const days = duration.get("days");
  return { hours, minutes, seconds, days };
};

// get duration time (>25)
export const getSumDuration = (secs: number) => {
  const hours = Math.trunc(secs / (60 * 60));
  const minutes = Math.trunc((secs % (hours * 60)) / 60);
  const seconds = Math.trunc((secs % (hours * minutes)) / 60);

  return { hours, minutes, seconds };
};

export const parseUnix = (unix: number = 0) => {
  return unix * 1000;
};

export {
  logoutUser,
  compareWords,
  localCollapsed,
  changeTheme,
  filterRoutes,
  // enterAsCompany,
  generateYear,
  hexToRgba,
  getDurationDate,
};
