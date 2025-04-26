import { instance } from "src/common/instance";
import { Todolist, TodolistSchema } from "./todolistsApi.types";
import type { BaseTodoResponse } from "src/common/types";
import { TodolistType } from "../model/todolists-slice";
import { baseApi } from "src/app/baseApi";

export const todolistsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTodolists: build.query<TodolistType[], void>({
      query: () => ({ url: "/todo-lists" }),
      transformResponse: (todolists: Todolist[]): TodolistType[] => {
        // TodolistSchema.array().parse(todolists);

        return todolists.map((todolist) => ({ ...todolist, filter: "All", entityStatus: "idle" }));
      },
      providesTags: ["Todolist"],
    }),
    createTodolist: build.mutation<BaseTodoResponse<{ item: Todolist }>, string>({
      query: (title) => ({
        method: "post",
        url: "/todo-lists",
        body: { title },
      }),
      invalidatesTags: ["Todolist"],
    }),
    deleteTodolist: build.mutation<BaseTodoResponse, string>({
      query: (id) => ({
        method: "delete",
        url: `/todo-lists/${id}`,
      }),
      invalidatesTags: ["Todolist"],
    }),
    changeTodolistTitle: build.mutation<BaseTodoResponse, { id: string; title: string }>({
      query: ({ id, title }) => ({
        method: "put",
        url: `/todo-lists/${id}`,
        body: { title },
      }),
      invalidatesTags: ["Todolist"],
    }),
  }),
});

export const {
  useGetTodolistsQuery,
  useCreateTodolistMutation,
  useDeleteTodolistMutation,
  useChangeTodolistTitleMutation,
} = todolistsApi;

export const _todolistsApi = {
  getTodolists() {
    return instance.get<Todolist[]>("/todo-lists");
  },
  createTodolist(title: string) {
    return instance.post<BaseTodoResponse<{ item: Todolist }>>("/todo-lists", { title });
  },
  deleteTodolist(id: string) {
    return instance.delete<BaseTodoResponse>(`/todo-lists/${id}`);
  },
  changeTodolistTitle(id: string, title: string) {
    return instance.put<BaseTodoResponse>(`/todo-lists/${id}`, { title });
  },
};
