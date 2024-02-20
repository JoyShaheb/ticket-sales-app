import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { IEventsProps } from "../../types/interface";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase-config";
import { NewEventType, UpdateEventType } from "../../types/types";

const eventsCollectionName = "events";

export const eventsAPI = createApi({
  reducerPath: "eventsAPI",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Events"],
  endpoints: (builder) => ({
    getAllEvents: builder.query<
      IEventsProps[],
      {
        userID: string;
      }
    >({
      queryFn: async ({ userID }) => {
        const requestQuery = query(
          collection(db, eventsCollectionName),
          where("userOwner", "==", userID)
        );

        const getAllevents = await getDocs(requestQuery);

        const querySnapshot = getAllevents.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });

        try {
          return {
            data: querySnapshot as IEventsProps[],
          };
        } catch (err) {
          return {
            error: (err as Error)?.message,
          };
        }
      },
      providesTags: ["Events"],
    }),

    deleteOneEvent: builder.mutation<
      string,
      {
        id: string;
      }
    >({
      queryFn: async ({ id }) => {
        const docRef = await doc(db, eventsCollectionName, id);
        await deleteDoc(docRef);
        try {
          return {
            data: "Event Deleted Successfully",
          };
        } catch (err) {
          return {
            error: (err as Error)?.message,
          };
        }
      },
      invalidatesTags: ["Events"],
    }),

    createOneEvent: builder.mutation<string, NewEventType>({
      queryFn: async ({
        date,
        description,
        title,
        userOwner,
        image,
        location,
      }) => {
        await addDoc(collection(db, eventsCollectionName), {
          date,
          description,
          title,
          userOwner,
          image,
          location,
        });
        try {
          return {
            data: "Event Added Successfully",
          };
        } catch (err) {
          return {
            error: (err as Error)?.message,
          };
        }
      },
      invalidatesTags: ["Events"],
    }),
    editOneEvent: builder.mutation<string, UpdateEventType>({
      queryFn: async ({ date, description, title, id, image, location }) => {
        try {
          const docRef = doc(db, eventsCollectionName, id);
          await updateDoc(docRef, {
            date,
            description,
            image,
            location,
            title,
          });

          return {
            data: "Event Updated Successfully",
          };
        } catch (err) {
          return {
            error: (err as Error)?.message,
          };
        }
      },
      invalidatesTags: ["Events"],
    }),
  }),
});

export const {
  useGetAllEventsQuery,
  useCreateOneEventMutation,
  useDeleteOneEventMutation,
  useEditOneEventMutation,
} = eventsAPI;
