import api from "@/api";
import { getLocalStorage } from "@/utils";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import moment from "moment";

type State = {
  IFTAReports: any[];
  status: string;
  error: null;
};

const initialState: State = {
  IFTAReports: [],
  status: "idle",
  error: null,
};

const apiUrl = "/logs/transfer";

export const updateLogsTransfer = createAsyncThunk(
  "logs/updateTransfer",
  async (
    data: {
      _id1: string;
      _id2: string;
      time: number;
      onCancel: () => void;
    },
    thunkAPI
  ) => {
    // console.log(`data`, data);
    const { onCancel, ...restObj } = data;
    try {
      // Make the PUT request using axios
      const response = await api.put(apiUrl, restObj);

      // Return the data from the response
      console.log(`response`, response);
      // @ts-ignore
      if (response.message === "OK") {
        // close modal
        onCancel();
      }

      return response.data;
    } catch (error) {
      // @ts-ignore
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const LogSlice = createSlice({
  name: "log",
  initialState: initialState,
  reducers: {
    // setIsAuth: (state: State, action: any) => {
    //   state.isAuth = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(updateLogsTransfer.pending, (state) => {
      state.status = "loading";
    });

    // Handle the fulfilled state
    builder.addCase(updateLogsTransfer.fulfilled, (state, action) => {
      state.status = "succeeded";
      // You can update your state with the data from the response if needed
    });

    // Handle the rejected state
    // builder.addCase(updateLogsTransfer.rejected, (state, action) => {
    //   state.status = "failed";
    //   state.error = action.payload.error;
    // });
    // builder.addCase(filterReport.pending, (state) => {
    //   state.loading = true;
    // });
    // builder.addCase(filterReport.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.IFTAReports = action.payload
    //     .flat()
    //     .map((item: any, idx: number) => ({ ...item, order: idx + 1 }));
    // });
  },
});

export default LogSlice;
