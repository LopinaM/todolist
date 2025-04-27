import { setAppErrorAC } from "src/app/app-clice";
import { isErrorWithMessage } from "./isErrorWithMessage";
import { BaseQueryApi, FetchBaseQueryError, FetchBaseQueryMeta, QueryReturnValue } from "@reduxjs/toolkit/query/react";
import { ResultCode } from "../enums";

// const customBaseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
//   const result = await fetchBaseQuery({
//     baseUrl: process.env.REACT_APP_BASE_URL,
//     prepareHeaders: (headers) => {
//       headers.set("API-KEY", `${process.env.REACT_APP_API_KEY}`);
//       headers.set("Authorization", `Bearer ${localStorage.getItem(AUTH_TOKEN)}`);
//     },
//   })(args, api, extraOptions);

//   if (result.error) {
//     if (
//       result.error.status === "FETCH_ERROR" ||
//       result.error.status === "PARSING_ERROR" ||
//       result.error.status === "CUSTOM_ERROR"
//     ) {
//       api.dispatch(setAppErrorAC({ error: result.error.error }));
//     }
//     if (result.error.status === 403) {
//       api.dispatch(setAppErrorAC({ error: "403 Forbidden Error. Check API-KEY" }));
//     }
//     if (result.error.status === 400 || result.error.status === 500) {
//       // // ✅ 1. Type Assertions
//       // api.dispatch(setAppErrorAC({ error: (result.error.data as { message: string }).message }));
//       // // ✅ 2. JSON.stringify
//       // api.dispatch(setAppErrorAC({ error: JSON.stringify(result.error) }));
//       // ✅ 3. Type Predicate (Хороший, но самый сложный в реализации вариант)
//       if (isErrorWithMessage(result.error.data)) {
//         api.dispatch(setAppErrorAC({ error: result.error.data.message }));
//       } else {
//         api.dispatch(setAppErrorAC({ error: JSON.stringify(result.error.data) }));
//       }
//     }
//   }

//   return result;
// };

export const handleError = (api: BaseQueryApi, result: QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>) => {
  let error = "Some error occurred";

  if (result.error) {
    switch (result.error.status) {
      case "FETCH_ERROR":
      case "PARSING_ERROR":
      case "CUSTOM_ERROR":
        error = result.error.error;
        break;
      case 403:
        error = "403 Forbidden Error. Check API-KEY";
        break;
      case 400:
      case 500:
        if (isErrorWithMessage(result.error.data)) {
          error = result.error.data.message;
        } else {
          error = JSON.stringify(result.error.data);
        }
        break;
      default:
        error = JSON.stringify(result.error);
        break;
    }
    api.dispatch(setAppErrorAC({ error }));
  }

  if ((result.data as { resultCode: ResultCode }).resultCode === ResultCode.Error) {
    const messages = (result.data as { messages: string[] }).messages;
    error = messages.length ? messages[0] : error;
    api.dispatch(setAppErrorAC({ error }));
  }
};
