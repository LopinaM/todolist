import React, { useEffect } from "react";
import { CircularProgress, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { useAppDispatch, useAppSelector } from "src/common/hooks";
import { getTheme } from "src/common/theme";
import { ErrorSnackbar, Header } from "src/common/components";
import { selectThemeMode } from "./app-clice";
import { Routing } from "src/common/routing";
import { initializeAppTC, selectIsInitialized } from "src/features/auth/model/auth-slice";
import styles from "./App.module.css";

const App = () => {
  const theme = getTheme(useAppSelector(selectThemeMode));
  const isInitialized = useAppSelector(selectIsInitialized);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeAppTC());
  }, []);

  if (!isInitialized) {
    return (
      <div className={styles.circularProgressContainer}>
        <CircularProgress size={150} thickness={3} />
      </div>
    );
  }

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
