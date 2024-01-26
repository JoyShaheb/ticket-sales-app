import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  uid: string;
  name: string;
  email: string;
  photoURL: string;
  phoneNumber: string;
}

export const initialState: UserState = {
  uid: "",
  name: "",
  email: "",
  photoURL: "",
  phoneNumber: "",
};

export const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<UserState>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    logoutSuccess: () => initialState,
  },
});

export const { loginSuccess, logoutSuccess } = userDataSlice.actions;
