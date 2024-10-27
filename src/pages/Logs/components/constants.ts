import { IOption, RangeLogStatus } from "@/types";

export const BREAK_TIME_LIMIT = 60 * 60 * 8;
export const DRIVE_TIME_LIMIT = 60 * 60 * 11;
export const SHIFT_TIME_LIMIT = 60 * 60 * 14;
export const CYCLE_TIME_LIMIT = 60 * 60 * 70;

export const POINT_STATUSES = ["intermediate", "login", "logout", "certify"];
export const POINT_STATUS_IMAGES = ["login", "logout"];
export const NOT_DRAW_STATUSES = ["login", "logout", "power_on", "power_off"];
export const RANGE_STATUSES: RangeLogStatus[] = [
   "on",
   "dr",
   "sb",
   "off",
   "off_pc",
   "on_ym",
];
export const LogStatusOptions: IOption<RangeLogStatus>[] = [
   { name: "dr", value: "dr" },
   { name: "off", value: "off" },
   { name: "off_pc", value: "off_pc" },
   { name: "on", value: "on" },
   { name: "on_ym", value: "on_ym" },
   { name: "sb", value: "sb" },
];

