// import type { ThemeMode } from "@/common/theme/theme";
import { ThemeMode } from "src/common/theme/theme";
import type { RootState } from "./store";

export const selectThemeMode = (state: RootState): ThemeMode =>
  state.app.themeMode;
