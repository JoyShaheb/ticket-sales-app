import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { IBookmarkProps } from "../../types/interface";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  query,
  getDocs,
} from "firebase/firestore";
import { db } from "../../config/firebase-config";

const bookmarksCollectionName = "bookmarks";

export const bookmarksAPI = createApi({
  reducerPath: "bookmarksAPI",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Bookmarks"],
  endpoints: (builder) => ({
    getAllBookmarks: builder.query<IBookmarkProps[], void>({
      queryFn: async () => {
        const requestQuery = query(collection(db, bookmarksCollectionName));

        const getAllBookmarks = await getDocs(requestQuery);

        const querySnapshot = getAllBookmarks.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });

        try {
          return {
            data: querySnapshot as IBookmarkProps[],
          };
        } catch (err) {
          return {
            error: (err as Error)?.message,
          };
        }
      },
      providesTags: ["Bookmarks"],
    }),

    addOneBookmark: builder.mutation<string, IBookmarkProps>({
      queryFn: async ({ userID, eventID }) => {
        await addDoc(collection(db, bookmarksCollectionName), {
          userID,
          eventID,
        });
        try {
          return {
            data: "Bookmark Added Successfully",
          };
        } catch (err) {
          return {
            error: (err as Error)?.message,
          };
        }
      },
      invalidatesTags: ["Bookmarks"],
    }),

    deleteOneBookmark: builder.mutation<
      string,
      {
        id: string;
      }
    >({
      queryFn: async ({ id }) => {
        const docRef = await doc(db, bookmarksCollectionName, id);
        await deleteDoc(docRef);
        try {
          return {
            data: "Bookmark Deleted Successfully",
          };
        } catch (err) {
          return {
            error: (err as Error)?.message,
          };
        }
      },
      invalidatesTags: ["Bookmarks"],
    }),
  }),
});

export const {
  useGetAllBookmarksQuery,
  useAddOneBookmarkMutation,
  useDeleteOneBookmarkMutation,
} = bookmarksAPI;
