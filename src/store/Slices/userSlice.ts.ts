import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface InitialStateProps {
  uid: string;
  email: string;
}

export const initialState: InitialStateProps = {
  uid: "",
  email: "",
};

export const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<InitialStateProps>) {
      return {
        ...state,
        ...action.payload,
      };
    },
    logoutSuccess: () => initialState,
  },
});

export const { loginSuccess, logoutSuccess } = userDataSlice.actions;
