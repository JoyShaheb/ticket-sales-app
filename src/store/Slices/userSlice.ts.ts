import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  uid: string;
  displayName: string;
  email: string;
  emailVerified: boolean;
  photoURL: string;
  phoneNumber: string;
  userRole: "user" | "admin" | "";
}

export const initialState: UserState = {
  uid: "",
  displayName: "",
  email: "",
  emailVerified: false,
  photoURL: "",
  phoneNumber: "",
  userRole: "",
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
    changeEmailVeificationStatus: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        emailVerified: action.payload,
      };
    },
    logoutSuccess: () => initialState,
  },
});

export const { loginSuccess, logoutSuccess, changeEmailVeificationStatus } =
  userDataSlice.actions;
