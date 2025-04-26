import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AUTH_TOKEN } from "src/common/constants";

export const baseApi = createApi({
  reducerPath: "todolistsApi",
  tagTypes: ["Todolist", "Tasks"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("API-KEY", `${process.env.REACT_APP_API_KEY}`);
      headers.set("Authorization", `Bearer ${localStorage.getItem(AUTH_TOKEN)}`);
    },
  }),
  endpoints: () => ({}),
});
