import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getLocalStorage } from "@/utils/localStorage";
export interface Data {
  [key: string]: string | number | boolean | null;
}
interface State {
  company: Data | false | null;
  companyId: string | null;
}
const boolean = Boolean(sessionStorage.getItem("company"));
const companyData = sessionStorage.getItem("company");

const parseData = companyData ? JSON.parse(companyData) : null;
const initialState: State = {
  company: boolean ? parseData : false,
  companyId: getLocalStorage("companyId"),
};
export const companySlice = createSlice({
  name: "companySlice",
  initialState,
  reducers: {
    setCompanyData: (state, action: PayloadAction<Data | false>) => {
      state.company = action.payload;
    },
  },
});

export const { setCompanyData } = companySlice.actions;
export default companySlice.reducer;
