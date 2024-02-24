import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { IBookmarkProps } from "../../types/interface";

import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase-config";

const bookmarksCollectionName = "bookmarks";

export const bookmarksAPI = createApi({
  reducerPath: "bookmarksAPI",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Bookmarks"],
  endpoints: (builder) => ({
    getAllBookmarks: builder.query<string[], Pick<IBookmarkProps, "userID">>({
      queryFn: async ({ userID }) => {
        try {
          const userDocRef = doc(db, bookmarksCollectionName, userID);
          const findDoc = await getDoc(userDocRef);

          if (!findDoc.exists()) {
            return {
              data: [],
            };
          }
          return {
            data: findDoc.data()?.bookmarks as string[],
          };
        } catch (err) {
          return {
            error: (err as Error)?.message,
          };
        }
      },
      providesTags: ["Bookmarks"],
    }),

    addOneBookmark: builder.mutation<
      string,
      Pick<IBookmarkProps, "eventID" | "userID">
    >({
      queryFn: async ({ userID, eventID }) => {
        try {
          // 1 user can have multiple bookmarks
          // if 1 user = no bookmarks, create a new document
          // if 1 user = multiple bookmarks, update the existing document

          const userDocRef = doc(db, bookmarksCollectionName, userID);
          const findDoc = await getDoc(userDocRef);

          if (findDoc.exists()) {
            const oldBookMarks = findDoc.data()?.bookmarks;

            if (oldBookMarks.includes(eventID)) {
              return {
                error: "Bookmark already exists",
              };
            } else {
              await setDoc(userDocRef, {
                bookmarks: [...oldBookMarks, eventID],
              });
            }
          } else {
            await setDoc(userDocRef, {
              bookmarks: [eventID],
            });
          }
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
      Pick<IBookmarkProps, "eventID" | "userID">
    >({
      queryFn: async ({ userID, eventID }) => {
        try {
          const userDocRef = doc(db, bookmarksCollectionName, userID);
          const findUser = await getDoc(userDocRef);

          if (findUser.exists()) {
            const oldBookMarks = findUser.data()?.bookmarks;
            const newBookMarks = oldBookMarks.filter(
              (bookmark: string) => bookmark !== eventID
            );
            await updateDoc(userDocRef, {
              bookmarks: newBookMarks,
            });
          } else {
            return {
              error: "Bookmark does not exist",
            };
          }
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
