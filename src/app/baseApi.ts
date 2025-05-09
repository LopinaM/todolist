import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AUTH_TOKEN } from "src/common/constants";
import { baseQueryWithZodValidation, handleError } from "src/common/utils";

export const baseApi = createApi({
  reducerPath: "todolistsApi",
  tagTypes: ["Todolist", "Tasks"],
  // keepUnusedDataFor: 5,
  // refetchOnFocus: true,
  // refetchOnReconnect: true,
  baseQuery: baseQueryWithZodValidation(async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl: process.env.REACT_APP_BASE_URL,
      prepareHeaders: (headers) => {
        headers.set("API-KEY", `${process.env.REACT_APP_API_KEY}`);
        headers.set("Authorization", `Bearer ${localStorage.getItem(AUTH_TOKEN)}`);
      },
    })(args, api, extraOptions);

    handleError(api, result);

    return result;
  }),
  endpoints: () => ({}),
});
