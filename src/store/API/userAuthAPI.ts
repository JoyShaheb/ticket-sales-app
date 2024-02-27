import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { auth, db, googleProvider } from "../../config/firebase-config";
import {
  createUserWithEmailAndPassword,
  UserCredential,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  confirmPasswordReset,
  sendEmailVerification,
  User,
  applyActionCode,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export interface IUserSignInData {
  email: string;
  password: string;
}

const usersCollectionName = "Users";

export const UserAuthAPI = createApi({
  reducerPath: "UserAuthAPI",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["User", "UpdateUser"],
  endpoints: (builder) => ({
    logout: builder.mutation<void, void>({
      queryFn: async () => {
        try {
          await signOut(auth);
          return {
            data: undefined,
          };
        } catch (err) {
          return {
            error: (err as Error)?.message,
          };
        }
      },
      invalidatesTags: ["User"],
    }),
    emailSignup: builder.mutation<UserCredential, IUserSignInData>({
      queryFn: async (user: IUserSignInData) => {
        try {
          const { email, password } = user;
          const response: UserCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );

          const documentName = response?.user?.uid;
          const userDocRef = doc(db, usersCollectionName, documentName);

          await setDoc(userDocRef, {
            uid: response?.user?.uid,
            displayName: response?.user?.displayName || "",
            fullName: "",
            address: "",
            phoneNumber: response?.user?.phoneNumber || "",
            photoURL: response?.user?.photoURL || "",
            email: response?.user?.email || "",
          }).then(() => {
            sendEmailVerification(auth.currentUser as User);
          });
          return {
            data: response,
          };
        } catch (err) {
          return {
            error: (err as Error)?.message,
          };
        }
      },
      invalidatesTags: ["User"],
    }),
    emailLogin: builder.mutation<UserCredential, IUserSignInData>({
      queryFn: async (user: IUserSignInData) => {
        try {
          const { email, password } = user;
          const response: UserCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          return {
            data: response,
          };
        } catch (err) {
          return {
            error: (err as Error)?.message,
          };
        }
      },
      invalidatesTags: ["User"],
    }),
    sendEmailVerification: builder.mutation<string, null>({
      queryFn: async () => {
        try {
          await sendEmailVerification(auth.currentUser as User, {
            // redirect to this page only after request is successful
            url: "http://localhost:5173/",
          });
          return {
            data: "Email verification sent to your email",
          };
        } catch (err) {
          return {
            error: (err as Error)?.message,
          };
        }
      },
    }),
    confirmEmailVerification: builder.mutation<any, any>({
      queryFn: async ({ oobCode }) => {
        try {
          await applyActionCode(auth, oobCode);
          return {
            data: "Successfully verified Email",
          };
        } catch (err) {
          return {
            error: (err as Error)?.message,
          };
        }
      },
      invalidatesTags: ["User"],
    }),
    googleSignup: builder.mutation<UserCredential, void>({
      queryFn: async () => {
        try {
          const response = await signInWithPopup(auth, googleProvider);
          return {
            data: response,
          };
        } catch (err) {
          return {
            error: (err as Error)?.message,
          };
        }
      },
      invalidatesTags: ["User"],
    }),

    sendResetPassWordEmail: builder.mutation<
      string,
      {
        email: string;
      }
    >({
      queryFn: async ({ email }) => {
        try {
          await sendPasswordResetEmail(auth, email, {
            // redirect to this page only after request is successful
            url: "http://localhost:5173/",
          });
          return {
            data: "Password reset link sent to your email",
          };
        } catch (err) {
          return {
            error: (err as Error)?.message,
          };
        }
      },
      invalidatesTags: ["User"],
    }),

    setNewPassWord: builder.mutation<
      string,
      {
        oobCode: string;
        password: string;
      }
    >({
      queryFn: async ({ oobCode, password }) => {
        await confirmPasswordReset(auth, oobCode, password);
        try {
          return {
            data: "Successfully reset Password",
          };
        } catch (err) {
          return {
            error: (err as Error)?.message,
          };
        }
      },
      invalidatesTags: ["User"],
    }),

    // get user profile
    getProfileData: builder.query<
      any,
      {
        userId: string;
      }
    >({
      queryFn: async ({ userId }) => {
        try {
          const userDoc = await getDoc(doc(db, usersCollectionName, userId));
          const docData = userDoc.data();

          return {
            data: docData as any,
          };
        } catch (err) {
          return {
            error: (err as Error)?.message,
          };
        }
      },
      providesTags: ["User"],
    }),

    // update user profile
    updateUserProfile: builder.mutation({
      queryFn: async (data: any) => {
        try {
          const findUserDoc = await getDoc(
            doc(db, usersCollectionName, data?.uid)
          );

          if (findUserDoc.exists()) {
            await setDoc(doc(db, usersCollectionName, data?.uid), {
              ...data,
            });
          }

          return {
            data: null,
          };
        } catch (err) {
          return {
            error: (err as Error)?.message,
          };
        }
      },
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useEmailSignupMutation,
  useEmailLoginMutation,
  useGoogleSignupMutation,
  useLogoutMutation,
  useSendResetPassWordEmailMutation,
  useSetNewPassWordMutation,
  useSendEmailVerificationMutation,
  useConfirmEmailVerificationMutation,
  useGetProfileDataQuery,
  useUpdateUserProfileMutation,
} = UserAuthAPI;
