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
      async onQueryStarted(id: string, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          todolistsApi.util.updateQueryData("getTodolists", undefined, (state) => {
            // const todolist = state.find((todolist) => todolist.id === id);
            // if (todolist) {
            //   todolist.entityStatus = "loading";
            // }
            const index = state.findIndex((todolist) => todolist.id === id);
            if (index !== -1) {
              state.splice(index, 1);
            }
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
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
