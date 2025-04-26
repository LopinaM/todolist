import { instance } from "src/common/instance";
import type { GetTasksResponse, Task, UpdateTaskModel } from "./tasksApi.types";
import { BaseTodoResponse } from "src/common/types";
import { baseApi } from "src/app/baseApi";

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<GetTasksResponse, string>({
      query: (todolistId) => `/todo-lists/${todolistId}/tasks`,
      providesTags: ["Tasks"],
    }),
    createTask: build.mutation<BaseTodoResponse<{ item: Task }>, { todolistId: string; title: string }>({
      query: ({ todolistId, title }) => ({
        url: `/todo-lists/${todolistId}/tasks`,
        method: "post",
        body: { title },
      }),
      invalidatesTags: ["Tasks"],
    }),
    updateTask: build.mutation<BaseTodoResponse<{ item: Task }>, { todolistId: string; taskId: string; model: UpdateTaskModel }>({
      query: ({ todolistId, taskId, model }) => ({
        url: `/todo-lists/${todolistId}/tasks/${taskId}`,
        method: "put",
        body: model,
      }),
      invalidatesTags: ["Tasks"],
    }),
    deleteTask: build.mutation<BaseTodoResponse<{ item: Task }>, { todolistId: string; taskId: string }>({
      query: ({ todolistId, taskId }) => ({
        url: `/todo-lists/${todolistId}/tasks/${taskId}`,
        method: "delete",
      }),
      invalidatesTags: ["Tasks"],
    }),
  }),
});

export const { useGetTasksQuery, useCreateTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation } = tasksApi;

export const _tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`).then((res) => res.data);
  },
  createTask(todolistId: string, title: string) {
    return instance.post<BaseTodoResponse<{ item: Task }>>(`/todo-lists/${todolistId}/tasks`, { title });
  },
  updateTask(payload: { todolistId: string; taskId: string; model: UpdateTaskModel }) {
    const { todolistId, taskId, model } = payload;
    return instance.put<BaseTodoResponse<{ item: Task }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model);
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<BaseTodoResponse>(`/todo-lists/${todolistId}/tasks/${taskId}`);
  },
};
