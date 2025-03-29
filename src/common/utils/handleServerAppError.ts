import type { Dispatch } from "@reduxjs/toolkit";
import type { BaseTodoResponse } from "../types";
import { setAppErrorAC, setAppStatusAC } from "src/app/app-clice";

export const handleServerAppError = <T>(data: BaseTodoResponse<T>, dispatch: Dispatch) => {
  const error = data.messages.length ? data.messages[0] : "Some error occurred";

  //   if (data.messages.length) {
  //     dispatch(setAppErrorAC({ error: data.messages[0] }));
  //   } else {
  //     dispatch(setAppErrorAC({ error: "Some error occurred" }));
  //   }
  dispatch(setAppErrorAC({ error }));
  dispatch(setAppStatusAC({ status: "failed" }));
};
