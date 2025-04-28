import { Todolist, TodolistSchema, CreateTodolistResponseSchema, CreateTodolistResponse } from "./todolistsApi.types";
import { defaultResponseSchema, type DefaultResponse } from "src/common/types";
import { baseApi } from "src/app/baseApi";
import { TodolistType } from "../lib/types/types";

export const todolistsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTodolists: build.query<TodolistType[], void>({
      query: () => ({ url: "/todo-lists" }),
      transformResponse: (todolists: Todolist[]): TodolistType[] => {
        // TodolistSchema.array().parse(todolists);

        return todolists.map((todolist) => ({ ...todolist, filter: "All", entityStatus: "idle" }));
      },
      providesTags: ["Todolist"],
      extraOptions: { dataSchema: TodolistSchema.array() },
    }),
    createTodolist: build.mutation<CreateTodolistResponse, string>({
      query: (title) => ({
        method: "post",
        url: "/todo-lists",
        body: { title },
      }),
      invalidatesTags: ["Todolist"],
      extraOptions: { dataSchema: CreateTodolistResponseSchema },
    }),
    deleteTodolist: build.mutation<DefaultResponse, string>({
      query: (id) => ({
        method: "delete",
        url: `/todo-lists/${id}`,
      }),
      invalidatesTags: ["Todolist"],
      extraOptions: { dataSchema: defaultResponseSchema },
    }),
    changeTodolistTitle: build.mutation<DefaultResponse, { id: string; title: string }>({
      query: ({ id, title }) => ({
        method: "put",
        url: `/todo-lists/${id}`,
        body: { title },
      }),
      invalidatesTags: ["Todolist"],
      extraOptions: { dataSchema: defaultResponseSchema },
    }),
  }),
});

export const { useGetTodolistsQuery, useCreateTodolistMutation, useDeleteTodolistMutation, useChangeTodolistTitleMutation } =
  todolistsApi;
