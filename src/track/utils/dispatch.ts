import {
  SelectData,
  setModalActive,
  setPageLoad,
  setSelect,
} from "@/store/slices/booleans-slice";
import { Data, setCompanyData } from "@/store/slices/company-slice";
import { setAuth, setData } from "@/store/slices/isAuth";
// import { store } from "@/store/index";
// import { SelectData } from "../types";
import store from "@/store";

const { dispatch } = store;
export const setIsAuth = (actions: boolean) => dispatch(setAuth(actions));
export const DriversSelectId = (data: SelectData[]) =>
  dispatch(setSelect(data));
export const setUser = (data: object) => dispatch(setData(data));

export const setCompany = (data: false | Data) =>
  dispatch(setCompanyData(data));

export const setPageLoading = (data: boolean) => dispatch(setPageLoad(data));

export const setModal = (data: boolean) => dispatch(setModalActive(data));
