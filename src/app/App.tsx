import React, { useEffect, useState } from "react";
import { CircularProgress, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { useAppDispatch, useAppSelector } from "src/common/hooks";
import { getTheme } from "src/common/theme";
import { ErrorSnackbar } from "src/common/components";
import { selectThemeMode, setIsLoggedInAC } from "./app-clice";
import { Routing } from "src/common/routing";
import styles from "./App.module.css";
import { useMeQuery } from "src/features/auth/api/authApi";
import { ResultCode } from "src/common/enums";

const App = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const theme = getTheme(useAppSelector(selectThemeMode));
  const dispatch = useAppDispatch();
  const { data, isLoading } = useMeQuery();

  useEffect(() => {
    if (isLoading) return;
    setIsInitialized(true);
    if (data?.resultCode === ResultCode.Success) {
      dispatch(setIsLoggedInAC({ isLoggedIn: true }));
    }
  }, [isLoading]);

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
      <Routing />
      <ErrorSnackbar />
    </ThemeProvider>
  );
};

export default App;
