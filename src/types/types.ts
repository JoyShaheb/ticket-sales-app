import { ThemeTypesEnum } from "./enum";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

export type TailwindThemeType = ThemeTypesEnum.DARK | ThemeTypesEnum.LIGHT;

export interface iErrorState {
  isLoading: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
  isFetching?: boolean;
}

export type GoogleAuthType = () => Promise<string | number>;
