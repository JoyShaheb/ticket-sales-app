import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { sysmtemSlice, resetSystem, themeSwitch } from "./Slices/systemSlice";
import { userDataSlice, logoutSuccess } from "./Slices/userSlice.ts";
import { BookMarkSlice, resetBookMark } from "./Slices/BookMarkSlice";
import {
  UserAuthAPI,
  useEmailSignupMutation,
  useEmailLoginMutation,
  useGoogleSignupMutation,
  useLogoutMutation,
  useSendResetPassWordEmailMutation,
  useSetNewPassWordMutation,
  useConfirmEmailVerificationMutation,
  useGetProfileDataQuery,
  useUpdateUserProfileMutation,
} from "./API/userAuthAPI";

import {
  useGetAllEventsQuery,
  useGetOneEventQuery,
  useCreateOneEventMutation,
  useDeleteOneEventMutation,
  useEditOneEventMutation,
  eventsAPI,
} from "./API/eventsAPI.ts";

import {
  useGetAllBookmarksQuery,
  useAddOneBookmarkMutation,
  useDeleteOneBookmarkMutation,
  bookmarksAPI,
} from "./API/BookmarksAPI.ts";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "root",
  storage,
};
const persistedSystemReducer = persistReducer(
  persistConfig,
  sysmtemSlice.reducer
);
const persistedUserReducer = persistReducer(
  persistConfig,
  userDataSlice.reducer
);

const persistedBookMarksReducer = persistReducer(
  persistConfig,
  BookMarkSlice.reducer
);

export const store = configureStore({
  reducer: {
    system: persistedSystemReducer,
    user: persistedUserReducer,
    bookmarks: persistedBookMarksReducer,
    [UserAuthAPI.reducerPath]: UserAuthAPI.reducer,
    [eventsAPI.reducerPath]: eventsAPI.reducer,
    [bookmarksAPI.reducerPath]: bookmarksAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      UserAuthAPI.middleware,
      eventsAPI.middleware,
      bookmarksAPI.middleware
    ),
});

export const persistedStore = persistStore(store);
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export {
  // system settings
  resetSystem,
  themeSwitch,
  // user auth
  useEmailSignupMutation,
  useEmailLoginMutation,
  useGoogleSignupMutation,
  useLogoutMutation,
  useSendResetPassWordEmailMutation,
  useSetNewPassWordMutation,
  useConfirmEmailVerificationMutation,
  useGetProfileDataQuery,
  useUpdateUserProfileMutation,
  // user auth slice
  logoutSuccess,

  //bookmark slice
  BookMarkSlice,
  resetBookMark,

  // events
  useGetAllEventsQuery,
  useGetOneEventQuery,
  useCreateOneEventMutation,
  useDeleteOneEventMutation,
  useEditOneEventMutation,

  // bookmarks
  useGetAllBookmarksQuery,
  useAddOneBookmarkMutation,
  useDeleteOneBookmarkMutation,
};
