import api from "@/api";
import { getLocalStorage } from "@/utils";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type State = {
  IFTAReports: any[];
  loading: boolean;
};

const initialState: State = {
  IFTAReports: [],
  loading: false,
};

export const filterReport = createAsyncThunk(
  "report/filterReport",
  async (filterReportObj: any) => {
    const { url, body, toggle } = filterReportObj;

    try {
      const response = await api.post(url, body);
      // @ts-ignore
      if (response.success) {
        toggle();
      }
      return response.data;
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  }
);

const ReportSlice = createSlice({
  name: "report",
  initialState: initialState,
  reducers: {
    // setIsAuth: (state: State, action: any) => {
    //   state.isAuth = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(filterReport.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(filterReport.fulfilled, (state, action) => {
      state.loading = false;
      state.IFTAReports = action.payload
        .flat()
        .map((item: any, idx: number) => ({ ...item, order: idx + 1 }));
    });
  },
});

export default ReportSlice;
