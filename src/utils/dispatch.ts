import { IUserData } from "@/types/user.type";
import store from "../store";
import { ThemeProps, UserTypes } from "@/types";
import { ICompanyData } from "@/types/company.type";
const { dispatch } = store;

// this function are useful for dispach store (instead of useDispatch)

export const setUserData = (payload: IUserData) => {
    dispatch({ type: "auth/setUserData", payload });
};

export const setUserType = (payload: UserTypes) => {
    dispatch({ type: "auth/setUserType", payload });
};

export const setIsAuth = (payload: boolean) => {
    dispatch({ type: "auth/setIsAuth", payload });
};

export const setIsNetworkErr = (payload: boolean) => {
    dispatch({ type: "auth/setIsNetworkErr", payload });
};

export const setTheme = (payload: ThemeProps) => {
    dispatch({ type: "auth/setTheme", payload });
};

export const setCompanies = (payload: ICompanyData[]) => {
    dispatch({ type: "auth/setCompanies", payload });
};
