import { createSlice } from "@reduxjs/toolkit";
import { bookmarksAPI } from "../API/BookmarksAPI";
import { toast } from "sonner";

interface IBookMark {
  // Save bookmarks under userID for the signed-in user
  bookmarks: string[];
}

const initialState: IBookMark = {
  bookmarks: [],
};

export const BookMarkSlice = createSlice({
  name: "BookMarks",
  initialState: initialState,
  reducers: {
    resetBookMark: () => initialState,
  },

  extraReducers(builder) {
    builder.addMatcher(
      bookmarksAPI.endpoints.getAllBookmarks.matchFulfilled,
      (state, action) => {
        return {
          ...state,
          bookmarks: action.payload,
        };
      }
    );

    builder
      .addMatcher(bookmarksAPI.endpoints.addOneBookmark.matchPending, () => {
        toast.loading("Saving event...");
      })
      .addMatcher(bookmarksAPI.endpoints.addOneBookmark.matchFulfilled, () => {
        toast.success("Event Saved Successfully");
      })
      .addMatcher(bookmarksAPI.endpoints.addOneBookmark.matchRejected, () => {
        toast.error("Unable to save Event. Please try again later.");
      });

    builder
      .addMatcher(bookmarksAPI.endpoints.deleteOneBookmark.matchPending, () => {
        toast.loading("Removing bookmark...");
      })
      .addMatcher(
        bookmarksAPI.endpoints.deleteOneBookmark.matchFulfilled,
        () => {
          toast.success("Event Removed Successfully");
        }
      )
      .addMatcher(
        bookmarksAPI.endpoints.deleteOneBookmark.matchRejected,
        () => {
          toast.error("Unable to remove Event. Please try again later.");
        }
      );
  },
});

export const { resetBookMark } = BookMarkSlice.actions;
