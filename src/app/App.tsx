import React from "react";
import "./App.css";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { useAppSelector } from "../common/hooks/useAppSelector";
import { selectThemeMode } from "./app-selectors";
import { getTheme } from "../common/theme/theme";
import { Header } from "../common/components/Header/Header";
import { Main } from "./Main";

const App = () => {
  const theme = getTheme(useAppSelector(selectThemeMode));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Main />
    </ThemeProvider>
  );
};

export default App;
