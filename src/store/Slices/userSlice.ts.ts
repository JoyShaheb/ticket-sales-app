import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { UserAuthAPI } from "../API/userAuthAPI";

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
};

export const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    logoutSuccess: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      UserAuthAPI.endpoints.logout.matchFulfilled,
      () => initialState
    );
    builder.addMatcher(
      UserAuthAPI.endpoints.confirmEmailVerification.matchFulfilled,
      (state) => {
        return {
          ...state,
          emailVerified: true,
        };
      }
    );
    builder.addMatcher(
      isAnyOf(
        UserAuthAPI.endpoints.emailLogin.matchFulfilled,
        UserAuthAPI.endpoints.googleSignup.matchFulfilled,
        UserAuthAPI.endpoints.emailSignup.matchFulfilled
      ),
      (state, action) => {
        const user = action?.payload?.user;
        return {
          ...state,
          uid: user?.uid as string,
          email: user?.email as string,
          emailVerified: user?.emailVerified as boolean,
          displayName: user?.displayName as string,
          photoURL: user?.photoURL as string,
          phoneNumber: user.phoneNumber as string,
        };
      }
    );
  },
});

export const { logoutSuccess } = userDataSlice.actions;
