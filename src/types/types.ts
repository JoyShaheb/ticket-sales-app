import { ThemeTypesEnum } from "./enum";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { IEventsProps } from "./interface";

export type TailwindThemeType = ThemeTypesEnum.DARK | ThemeTypesEnum.LIGHT;

export interface iErrorState {
  isLoading: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
  isFetching?: boolean;
}

export type GoogleAuthType = () => Promise<string | number>;

export type NewEventType = Pick<
  IEventsProps,
  "date" | "description" | "title" | "userOwner" | "location" | "image"
>;

export type UpdateEventType = Pick<
  IEventsProps,
  "date" | "description" | "title" | "id" | "location" | "image"
>;
