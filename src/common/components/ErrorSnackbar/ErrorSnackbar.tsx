import { Alert, Snackbar } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { selectAppError, setAppErrorAC } from "src/app/app-clice";
import { useAppDispatch, useAppSelector } from "src/common/hooks";

export const ErrorSnackbar = () => {
  const error = useAppSelector(selectAppError);
  const dispatch = useAppDispatch();

  const onClose = (_: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(setAppErrorAC({ error: null }));
  };

  return (
    <Snackbar open={error !== null} autoHideDuration={6000} onClose={onClose}>
      <Alert onClose={onClose} severity="error" variant="filled" sx={{ width: "100%" }}>
        {error}
      </Alert>
    </Snackbar>
  );
};
