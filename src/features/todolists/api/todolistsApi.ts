import { instance } from "src/common/instance";
import { Todolist } from "./todolistsApi.types";
import type { BaseTodoResponse } from "src/common/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AUTH_TOKEN } from "src/common/constants";
import { TodolistType } from "../model/todolists-slice";

export const todolistsApi = createApi({
  // `reducerPath` - имя `slice`, куда будут сохранены состояние и экшены для этого `API`
  reducerPath: "todolistsApi",
  // `baseQuery` - конфигурация для `HTTP-клиента`, который будет использоваться для отправки запросов
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("API-KEY", `${process.env.REACT_APP_API_KEY}`);
      headers.set("Authorization", `Bearer ${localStorage.getItem(AUTH_TOKEN)}`);
    },
  }),
  // `endpoints` - метод, возвращающий объект с эндпоинтами для `API`, описанными
  // с помощью функций, которые будут вызываться при вызове соответствующих методов `API`
  // (например `get`, `post`, `put`, `patch`, `delete`)
  endpoints: (build) => ({
    // Типизация аргументов (<возвращаемый тип, тип query аргументов (`QueryArg`)>)
    // `query` по умолчанию создает запрос `get` и указание метода необязательно
    getTodolists: build.query<TodolistType[], void>({
      query: () => ({ url: "/todo-lists" }),
      transformResponse: (todolists: Todolist[]): TodolistType[] =>
        todolists.map((todolist) => ({ ...todolist, filter: "All", entityStatus: "idle" })),
    }),
    createTodolist: build.mutation<BaseTodoResponse<{ item: Todolist }>, string>({
      query: (title) => ({
        method: "post",
        url: "/todo-lists",
        body: { title },
      }),
    }),
    deleteTodolist: build.mutation<BaseTodoResponse, string>({
      query: (id) => ({
        method: "delete",
        url: `/todo-lists/${id}`,
      }),
    }),
    changeTodolistTitle: build.mutation<BaseTodoResponse, { id: string; title: string }>({
      query: ({ id, title }) => ({
        method: "put",
        url: `/todo-lists/${id}`,
        body: { title },
      }),
    }),
  }),
});

// `createApi` создает объект `API`, который содержит все эндпоинты в виде хуков,
// определенные в свойстве `endpoints`
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
