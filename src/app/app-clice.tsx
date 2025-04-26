import { createSlice } from "@reduxjs/toolkit";
import type { ThemeMode } from "src/common/theme";
import type { RequestStatus } from "src/common/types";

const initialState = {
  themeMode: "light" as ThemeMode,
  status: "idle" as RequestStatus,
  error: null as string | null,
  isLoggedIn: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: (create) => ({
    changeThemeModeAC: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
      state.themeMode = action.payload.themeMode;
    }),
    setAppStatusAC: create.reducer<{ status: RequestStatus }>((state, action) => {
      state.status = action.payload.status;
    }),
    setAppErrorAC: create.reducer<{ error: string | null }>((state, action) => {
      state.error = action.payload.error;
    }),
    setIsLoggedInAC: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    }),
  }),
  selectors: {
    selectThemeMode: (sliceState) => sliceState.themeMode,
    selectStatus: (sliceState) => sliceState.status,
    selectAppError: (sliceState) => sliceState.error,
    selectIsLoggedIn: (state) => state.isLoggedIn,
  },
});

export const appReducer = appSlice.reducer;

export const { changeThemeModeAC, setAppStatusAC, setAppErrorAC, setIsLoggedInAC } = appSlice.actions;
export const { selectThemeMode, selectStatus, selectAppError, selectIsLoggedIn } = appSlice.selectors;
