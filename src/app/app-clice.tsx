import { createSlice } from "@reduxjs/toolkit";
import type { ThemeMode } from "src/common/theme";
import type { RequestStatus } from "src/common/types";

const initialState = {
  themeMode: "light" as ThemeMode,
  status: "idle" as RequestStatus,
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
  }),
  selectors: {
    selectThemeMode: (sliceState) => sliceState.themeMode,
    selectStatus: (sliceState) => sliceState.status,
  },
});

export const appReducer = appSlice.reducer;

export const { changeThemeModeAC, setAppStatusAC } = appSlice.actions;
export const { selectThemeMode, selectStatus } = appSlice.selectors;
