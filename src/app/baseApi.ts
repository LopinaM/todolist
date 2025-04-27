import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AUTH_TOKEN } from "src/common/constants";
import { handleError } from "src/common/utils/handleError";

export const baseApi = createApi({
  reducerPath: "todolistsApi",
  tagTypes: ["Todolist", "Tasks"],
  baseQuery: async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl: process.env.REACT_APP_BASE_URL,
      prepareHeaders: (headers) => {
        headers.set("API-KEY", `${process.env.REACT_APP_API_KEY}`);
        headers.set("Authorization", `Bearer ${localStorage.getItem(AUTH_TOKEN)}`);
      },
    })(args, api, extraOptions);

    handleError(api, result);

    return result;
  },
  endpoints: () => ({}),
});
