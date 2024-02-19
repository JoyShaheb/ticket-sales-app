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
  getDoc,
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

    getOneEvent: builder.query<IEventsProps, { id: string; userID: string }>({
      queryFn: async ({ id, userID }) => {
        const docRef = doc(db, eventsCollectionName, id);
        try {
          const getEvent = await getDoc(docRef);

          if (getEvent.exists()) {
            const eventData = getEvent.data() as IEventsProps;
            // You can use userID in your logic if needed.
            console.log(`Fetching event with userID: ${userID}`);
            return { data: { ...eventData, id: getEvent.id } };
          } else {
            throw new Error("Event not found");
          }
        } catch (err) {
          console.error("Error fetching event details:", err);
          return { error: (err as Error)?.message };
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
  useGetOneEventQuery,
  useCreateOneEventMutation,
  useDeleteOneEventMutation,
  useEditOneEventMutation,
} = eventsAPI;