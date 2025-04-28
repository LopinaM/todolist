import { DefaultResponse } from "src/common/types";
import { Inputs } from "../lib/schemas";
import { baseApi } from "src/app/baseApi";
import { LoginResponse, MeResponse } from "../../../common/types/types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, Inputs>({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
    }),
    logout: build.mutation<DefaultResponse, void>({
      query: () => ({
        url: "auth/login",
        method: "DELETE",
      }),
    }),
    me: build.query<MeResponse, void>({
      query: () => "auth/me",
    }),
  }),
});

export const { useMeQuery, useLoginMutation, useLogoutMutation } = authApi;
