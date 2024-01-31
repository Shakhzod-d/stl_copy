import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import reportSlice from "./slices/reportSlice";
import LogSlice from "./slices/logSlice";

const store = configureStore({
  devTools: true,
  reducer: {
    auth: authSlice.reducer,
    reports: reportSlice.reducer,
    log: LogSlice.reducer,
  },
});

// types of store reducers
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
