import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
  isAuth: boolean;
  data: object;
}
const initialState: State = {
  isAuth: false,
  data: [],
};

export const isAuth = createSlice({
  name: "isAuth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setData: (state, action: PayloadAction<object>) => {
      state.data = action.payload;
    },
  },
});

export const { setAuth, setData } = isAuth.actions;

export default isAuth.reducer;
