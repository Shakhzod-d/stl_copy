import api from "@/api";
import { getLocalStorage } from "@/utils";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import moment from "moment";

type State = {
  IFTAReports: any[];
  MFCSAReports: any;
  loading: boolean;
};

const initialState: State = {
  IFTAReports: [],
  MFCSAReports: null,
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

export const getReportsInitially = createAsyncThunk(
  "report/getReportsInitially",
  async (filterReportObj: any) => {
    const { url, body } = filterReportObj;

    try {
      const response = await api.post(url, body);
      console.log(`response`, response.data);

      return response.data;
    } catch (error) {
      console.error("Error IFTA report:", error);
      throw error;
    }
  }
);

export const getFmcsaReports = createAsyncThunk(
  "report/getFmcsaReports",
  async (url: string) => {
    try {
      const response = await api.get(url);
      // console.log(`response`, response.data);

      return response.data;
    } catch (error) {
      console.error("Error FMCSA report:", error);
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

    builder.addCase(getReportsInitially.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getReportsInitially.fulfilled, (state, action) => {
      state.loading = false;
      state.IFTAReports = action.payload.map((item: any, idx: number) => ({
        ...item,
        order: idx + 1,
        time: moment.unix(item.time).format("DD-MM-YYYY"),
      }));
    });

    builder.addCase(getFmcsaReports.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getFmcsaReports.fulfilled, (state, action) => {
      state.loading = false;
      state.MFCSAReports = action.payload;
    });
  },
});

export default ReportSlice;
