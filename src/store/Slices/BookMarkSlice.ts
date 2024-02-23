import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IBookMark {
  savedEvents: string[];
}

const initialState: IBookMark = {
  savedEvents: [],
};

export const BookMarkSlice = createSlice({
  name: "BookMarks",
  initialState,
  reducers: {
    saveEvent: (state: IBookMark, action: PayloadAction<string>) => ({
      ...state,
      savedEvents: [...state.savedEvents, action.payload],
    }),
    removeEvent: (state: IBookMark, action: PayloadAction<string>) => {
      const index = state.savedEvents.findIndex((id) => id === action.payload);
      if (index !== -1) {
        state.savedEvents.splice(index, 1);
      }
    },
    resetBookMark: () => initialState,
  },
});

export const { resetBookMark, saveEvent, removeEvent } = BookMarkSlice.actions;
