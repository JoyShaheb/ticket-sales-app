import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IBookMark {
  // Save bookmarks under userID for the signed-in user
  [userID: string]: {
    savedEvents: string[];
  };
}

const initialState: IBookMark = {};

// Load bookmarks from localStorage on initial load
const loadBookmarksFromStorage = () => {
  const storedBookmarks = localStorage.getItem("bookmarks");
  return storedBookmarks ? JSON.parse(storedBookmarks) : {};
};

export const BookMarkSlice = createSlice({
  name: "BookMarks",
  initialState: loadBookmarksFromStorage(),
  reducers: {
    saveEvent: (
      state: IBookMark,
      action: PayloadAction<{ userID: string; eventID: string }>
    ) => {
      const { userID, eventID } = action.payload;
      if (!state[userID]) {
        state[userID] = { savedEvents: [eventID] };
      } else {
        state[userID].savedEvents = [...state[userID].savedEvents, eventID];
      }

      // Save bookmarks to localStorage
      localStorage.setItem("bookmarks", JSON.stringify(state));
    },
    removeEvent: (
      state: IBookMark,
      action: PayloadAction<{ userID: string; eventID: string }>
    ) => {
      const { userID, eventID } = action.payload;
      if (state[userID]) {
        const index = state[userID].savedEvents.findIndex(
          (id) => id === eventID
        );
        if (index !== -1) {
          state[userID].savedEvents.splice(index, 1);
        }

        // Save bookmarks to localStorage
        localStorage.setItem("bookmarks", JSON.stringify(state));
      }
    },
    resetBookMark: (_state: IBookMark) => {
      // Reset all bookmarks when logging out or similar action
      localStorage.removeItem("bookmarks");
      return {};
    },
  },
});

export const { resetBookMark, saveEvent, removeEvent } = BookMarkSlice.actions;
