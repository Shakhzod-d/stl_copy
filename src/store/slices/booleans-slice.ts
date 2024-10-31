import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getLocalStorage } from "@/utils/localStorage";

export interface SelectData {
  value: string | unknown;
  label: string;
}
interface Bool {
  dashboardProgress: boolean;
  sidebarActive: boolean;
  MCompanyPages: string;
  darkMode: boolean;
  driverSelect: SelectData[] | [];
  pageLoading: boolean;
  modal: boolean;
  modalAnimated: boolean;
}
const dark_mode =
  getLocalStorage("darkMode") === "false" ||
  getLocalStorage("darkMode") === null
    ? false
    : true;

const initialState: Bool = {
  dashboardProgress: false,
  sidebarActive: true,
  MCompanyPages: "company",
  darkMode: Boolean(dark_mode),
  driverSelect: [],
  pageLoading: false,
  modal: false,
  modalAnimated: false,
};

const booleanSlice = createSlice({
  name: "booleans",
  initialState,
  reducers: {
    dashboardProgressActive: (state) => {
      state.dashboardProgress = !state.dashboardProgress;
    },
    sidebarToggle: (state, action: PayloadAction<boolean>) => {
      state.sidebarActive = action.payload;
    },
    setTabPages: (state, action: PayloadAction<string>) => {
      state.MCompanyPages = action.payload;
    },
    setDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    setSelect: (state, action: PayloadAction<SelectData[]>) => {
      state.driverSelect = action.payload;
    },
    setPageLoad: (state, action: PayloadAction<boolean>) => {
      state.pageLoading = action.payload;
    },
    setModalActive: (state, action: PayloadAction<boolean>) => {
      state.modal = action.payload;
    },
    setModalAnimated: (state, action: PayloadAction<boolean>) => {
      state.modalAnimated = action.payload;
    },
  },
});

export const {
  dashboardProgressActive,
  sidebarToggle,
  setTabPages,
  setDarkMode,
  setSelect,
  setPageLoad,
  setModalActive,
  setModalAnimated,
} = booleanSlice.actions;

export default booleanSlice.reducer;
