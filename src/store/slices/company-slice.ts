import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getLocalStorage } from "@/utils/localStorage";
import { WeekData } from "@/track/components/shared/drivers-header/drivers-header";
import { stat } from "fs";
export interface Data {
  [key: string]: any;
}
interface State {
  company: Data | false | null;
  companyId: string | null;
  weekData: WeekData[];
  modalRole: "add" | "edit";
  loggerCompanyData: Data;
  editCompany: Data | false;
}
const boolean = Boolean(getLocalStorage("company"));
const companyData = getLocalStorage("company");

const parseData = companyData ? JSON.parse(companyData) : null;
const initialState: State = {
  company: boolean ? parseData : false,
  companyId: getLocalStorage("companyId"),
  weekData: [],
  modalRole: "add",
  loggerCompanyData: [],
  editCompany: false,
};
export const companySlice = createSlice({
  name: "companySlice",
  initialState,
  reducers: {
    setCompanyData: (state, action: PayloadAction<Data | false>) => {
      state.company = action.payload;
    },
    setWeekData: (state, action: PayloadAction<WeekData[]>) => {
      state.weekData = action.payload;
    },
    setRole: (state, action: PayloadAction<"add" | "edit">) => {
      state.modalRole = action.payload;
    },
    setLoggerCompanyData: (state, action: PayloadAction<Data>) => {
      state.loggerCompanyData = action.payload;
    },
    setEditCompany: (state, action: PayloadAction<Data | false>) => {
      state.editCompany = action.payload;
    },
  },
});

export const {
  setCompanyData,
  setWeekData,
  setRole,
  setLoggerCompanyData,
  setEditCompany,
} = companySlice.actions;
export default companySlice.reducer;
