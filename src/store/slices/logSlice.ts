import api from "@/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

type State = {
  IFTAReports: any[];
  status: string;
  error: null;
  homeTerminalTimezone: string;
  companyTimeZone: string;
  drivers: any[];
  logForm: any;
};

const initialState: State = {
  IFTAReports: [],
  status: "idle",
  error: null,
  homeTerminalTimezone: "",
  companyTimeZone: "",
  drivers: [],
  logForm: null,
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
      // console.log(`response`, response);
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

export const postInsertInfoLog = createAsyncThunk(
  "logs/postInsertInfoLog",
  async (data: any, thunkAPI) => {
    const { onCancel, handleLogItems, ...restObj } = data;
    const url = `/interlog`;
    try {
      const response = await api.post(url, restObj);

      // @ts-ignore
      if (response.message === "OK") {
        handleLogItems(response.data)
        onCancel();

      }

      return response.data;
    } catch (error) {
      // @ts-ignore
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const putOtherStatus = createAsyncThunk(
  "logs/putOtherStatus",
  async (data: any, thunkAPI) => {
    const { onCancel, ...restObj } = data;
    const url = `/interlog`;
    try {
      const response = await api.put(url, restObj);

      // @ts-ignore
      if (response.message === "OK") {
        // close modal
        onCancel();
      }

      return response;
    } catch (error) {
      // @ts-ignore
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const putCertify = createAsyncThunk(
  "certify/putCertify",
  async (data: any, thunkAPI) => {
    const { onCancel, ...restObj } = data;
    const url = `/certify`;
    try {
      const response = await api.put(url, restObj);

      console.log(`response`, response);
      // Return the data from the response
      // @ts-ignore
      if (response.message === "OK") {
        // close modal
        onCancel();
      }

      return response;
    } catch (error) {
      // @ts-ignore
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const putLogForm = createAsyncThunk(
  "logs/putLogForm",
  async (data: any, thunkAPI) => {
    const { onCancel, _id, ...restObj } = data;
    const url = `/mainInfo?_id=${_id}`
    try {
      const response = await api.put(url, restObj)
      // Return the data from the response
  
      // @ts-ignore
      if (response.message === "OK") {
        // close modal 
        message.success("Success")
        onCancel()
        
      }else{
        message.error("Error")
      }
      
      
      return response
    } catch (error) {
      
      // @ts-ignore
      return thunkAPI.rejectWithValue({ error: error.message })
    }
  }
)

export const certifyDeleteTableItem = createAsyncThunk(
  "logs/certifyDeleteTableItem",
  async (id: string, thunkAPI) => {
    
    const url = `/certify/${id}`
    try {
      const response = await api.delete(url)
      //@ts-ignore
      if (response.message === "OK") {
        message.success("deleted!")
      }

      return response
    } catch {
      // @ts-ignore
      return thunkAPI.rejectWithValue({ error: error.message })
    }
  }
)

export const deleteTableItem = createAsyncThunk(
  "logs/deleteTableItem",
  async (id: string, thunkAPI) => {
    const url = `/interlog/delete/${id}`
    try {
      const response = await api.delete(url)
      console.log("response", response)
      //@ts-ignore
      if (response.message === "OK") {
        message.success("deleted!")
      }

      return response
    } catch {
      // @ts-ignore
      return thunkAPI.rejectWithValue({ error: error.message })
    }
  }
)


export const getItems = createAsyncThunk(
  "drivers/getItems",
  async (url: string, thunkAPI) => {
    try {
      const response = await api.get(url);

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
    setHomeTerminalTimezone: (state: State, action: any) => {
      state.homeTerminalTimezone = action.payload;
    },
    setCompanyTimeZone: (
      state: State,
      action: { type: string; payload: string }
    ) => {
      state.companyTimeZone = action.payload || "Eastern Time";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateLogsTransfer.pending, (state) => {
      state.status = "loading";
    });

    // Handle the fulfilled state
    builder
      .addCase(updateLogsTransfer.fulfilled, (state, action) => {
        state.status = "succeeded";
        // You can update your state with the data from the response if needed
      })
      .addCase(getItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getItems.fulfilled, (state, action) => {
        // console.log(`action.payload`, action.payload);
        state.status = "succeeded";
        state.logForm = action.payload;
      })
  },
});

//setCompanyTimeZone
export const { setCompanyTimeZone } = LogSlice.actions;

export default LogSlice;
