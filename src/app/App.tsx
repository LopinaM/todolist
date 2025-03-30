import React from "react";
import "./App.css";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { useAppSelector } from "src/common/hooks";
import { getTheme } from "src/common/theme";
import { ErrorSnackbar, Header } from "src/common/components";
import { selectThemeMode } from "./app-clice";
import { Routing } from "src/common/routing";

const App = () => {
  const theme = getTheme(useAppSelector(selectThemeMode));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Routing />
      <ErrorSnackbar />
    </ThemeProvider>
  );
};

export default App;
