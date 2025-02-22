import { ThemeMode } from "src/common/theme/";
import type { RootState } from "./store";

export const selectThemeMode = (state: RootState): ThemeMode =>
  state.app.themeMode;
