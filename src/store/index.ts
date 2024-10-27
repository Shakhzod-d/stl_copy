import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import reportSlice from "./slices/reportSlice";
import LogSlice from "./slices/logSlice";
import { booleanSlice } from "./slices/booleans-slice";
import { companySlice } from "./slices/company-slice";
import { isAuth } from "./slices/isAuth";

const store = configureStore({
  devTools: true,
  reducer: {
    auth: authSlice.reducer,
    reports: reportSlice.reducer,
    log: LogSlice.reducer,
    booleans: booleanSlice.reducer,
    company: companySlice.reducer,
    isAuth: isAuth.reducer,
  },
});

// types of store reducers
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
