import { createSlice } from "@reduxjs/toolkit";
import type { ThemeMode } from "src/common/theme";

const initialState = {
  themeMode: "light" as ThemeMode,
};

export const appSlice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: (create) => ({
    changeThemeModeAC: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
      state.themeMode = action.payload.themeMode;
    }),
  }),
  selectors: {
    selectThemeMode: (sliceState) => sliceState.themeMode,
  },
});

export const appReducer = appSlice.reducer;

export const { changeThemeModeAC } = appSlice.actions;
export const { selectThemeMode } = appSlice.selectors;
