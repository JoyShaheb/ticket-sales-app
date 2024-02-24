import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { IBookmarkProps } from "../../types/interface";

import {
  collection,
  deleteDoc,
  doc,
  query,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
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
        const userDocRef = doc(db, bookmarksCollectionName, userID);

        // Check if the user document exists
        const userDocSnapshot = await getDoc(userDocRef);

        if (!userDocSnapshot.exists()) {
          // If the user document does not exist, create it with the first eventID
          await setDoc(userDocRef, { eventIDs: [eventID] });
        } else {
          // If the user document exists, update the eventIDs array
          const userDocData = userDocSnapshot.data();
          const updatedEventIDs = [...(userDocData?.eventIDs || []), eventID];

          await updateDoc(userDocRef, { eventIDs: updatedEventIDs });
        }

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

    deleteOneBookmark: builder.mutation<string, { id: string }>({
      queryFn: async ({ id }) => {
        // Get the reference to the bookmark document
        const docRef = doc(db, bookmarksCollectionName, id);

        // Get the data from the bookmark document before deleting it
        const bookmarkData = (await getDoc(docRef)).data();

        if (bookmarkData) {
          const { userID, eventID } = bookmarkData;

          // Delete the bookmark document
          await deleteDoc(docRef);

          // Now, update the user's document to remove the eventID
          const userDocRef = doc(db, bookmarksCollectionName, userID);
          const userDocSnapshot = await getDoc(userDocRef);

          if (userDocSnapshot.exists()) {
            const userDocData = userDocSnapshot.data();
            const updatedEventIDs = (userDocData?.eventIDs || []).filter(
              (id: any) => id !== eventID
            );

            // Update the user's document with the modified eventIDs array
            await updateDoc(userDocRef, { eventIDs: updatedEventIDs });
          }

          try {
            return {
              data: "Bookmark Deleted Successfully",
            };
          } catch (err) {
            return {
              error: (err as Error)?.message,
            };
          }
        }

        return {
          error: "Bookmark not found",
        };
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
