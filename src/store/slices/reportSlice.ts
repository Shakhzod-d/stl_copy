import { getLocalStorage } from "@/utils";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type State = {};

const initialState: State = {};

export const filterReport = createAsyncThunk(
  "report/filterReport",
  async (filterReportObj: any) => {
    const { url, body } = filterReportObj;
    console.log(filterReportObj);
    try {
      const response = await axios.post(url, body, {
        headers: { Authorization: `Bearer ${getLocalStorage("token")}` },
      });
      console.log(response);
      return response.data.createdPost;
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
});

export default ReportSlice;
