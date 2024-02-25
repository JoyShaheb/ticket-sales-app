import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { UserAuthAPI } from "../API/userAuthAPI";
import { toast } from "sonner";

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
    logoutSuccess: () => initialState,
  },
  extraReducers: (builder) => {
    const {
      logout,
      confirmEmailVerification,
      emailLogin,
      googleSignup,
      emailSignup,
    } = UserAuthAPI.endpoints;

    builder
      .addMatcher(logout.matchPending, (state) => {
        toast.loading("Logging out...");
        return state;
      })
      .addMatcher(logout.matchFulfilled, () => {
        toast.success("Logged out successfully");
        return initialState;
      })
      .addMatcher(logout.matchRejected, (state) => {
        toast.error("Unable to logout, please try again");
        return state;
      });
    builder.addMatcher(confirmEmailVerification.matchFulfilled, (state) => {
      return {
        ...state,
        emailVerified: true,
      };
    });
    builder.addMatcher(
      isAnyOf(
        emailLogin.matchFulfilled,
        googleSignup.matchFulfilled,
        emailSignup.matchFulfilled
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
          // ommit this line later when the logic is implemented
          userRole: "admin",
        };
      }
    );
  },
});

export const { logoutSuccess } = userDataSlice.actions;
