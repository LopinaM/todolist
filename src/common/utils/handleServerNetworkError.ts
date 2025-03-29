import type { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { setAppErrorAC, setAppStatusAC } from "src/app/app-clice";

export const handleServerNetworkError = (error: unknown, dispatch: Dispatch) => {
  let errorMessage = "some error occurred";

  if (axios.isAxiosError(error)) {
    errorMessage = error.message;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else {
    errorMessage = JSON.stringify(error);
  }

  dispatch(setAppErrorAC({ error: errorMessage }));
  dispatch(setAppStatusAC({ status: "failed" }));
};
