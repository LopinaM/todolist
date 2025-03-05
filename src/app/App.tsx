import React from "react";
import "./App.css";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { useAppSelector } from "src/common/hooks";
import { getTheme } from "src/common/theme";
import { Header } from "src/common/components";
import { Main } from "./Main";
import { selectThemeMode } from "./app-clice";

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
