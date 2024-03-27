import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserTypes, ThemeProps } from "@/types";
import { ILoginData } from "../../pages/Login/login.types";
import { IUserData } from "@/types/user.type";
import { ICompanyData } from "@/types/company.type";

// interface of reducer
type State = {
    userData: IUserData | null;
    userType: UserTypes | null;
    isAuth: boolean;
    isNetworkErr: boolean;
    theme: ThemeProps;
    companies: ICompanyData[];
    ok: null;
};

// initial values of reducer
const initialState: State = {
    userData: null,
    userType: null,
    isAuth: false,
    isNetworkErr: false,
    theme: "light",
    companies: [],
    ok: null,
};

const AuthSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setIsAuth: (state: State, action: any) => {
            state.isAuth = action.payload;
        },
        setUserData: (state: State, action: PayloadAction<IUserData>) => {
            state.userData = action.payload;
            // state.userType = action.payload?.type;
            state.isAuth = true;
            // state.company = action.pa;
        },
        setIsNetworkErr: (state: State, action: any) => {
            state.isNetworkErr = action.payload;
        },
        setTheme: (state: State, action: any) => {
            state.theme = action.payload;
        },
        setCompanies: (state: State, action: PayloadAction<ICompanyData[]>) => {

            state.companies = state.userData?.companyId === null ? action.payload : action.payload.filter(item=>item._id === state.userData?.companyId)
            
            // console.log(state.userData?.companyId);
            
        },
    },
});

export default AuthSlice;
