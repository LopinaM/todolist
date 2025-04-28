import {
  getTasksSchema,
  TaskOperationResponse,
  TaskOperationResponseSchema,
  type GetTasksResponse,
  type UpdateTaskModel,
} from "./tasksApi.types";
import { defaultResponseSchema } from "src/common/types";
import { baseApi } from "src/app/baseApi";

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<GetTasksResponse, string>({
      query: (todolistId) => `/todo-lists/${todolistId}/tasks`,
      providesTags: ["Tasks"],
      extraOptions: { dataSchema: getTasksSchema },
    }),
    createTask: build.mutation<TaskOperationResponse, { todolistId: string; title: string }>({
      query: ({ todolistId, title }) => ({
        url: `/todo-lists/${todolistId}/tasks`,
        method: "post",
        body: { title },
      }),
      invalidatesTags: ["Tasks"],
      extraOptions: { dataSchema: TaskOperationResponseSchema },
    }),
    updateTask: build.mutation<TaskOperationResponse, { todolistId: string; taskId: string; model: UpdateTaskModel }>({
      query: ({ todolistId, taskId, model }) => ({
        url: `/todo-lists/${todolistId}/tasks/${taskId}`,
        method: "put",
        body: model,
      }),
      invalidatesTags: ["Tasks"],
      extraOptions: { dataSchema: TaskOperationResponseSchema },
    }),
    deleteTask: build.mutation<TaskOperationResponse, { todolistId: string; taskId: string }>({
      query: ({ todolistId, taskId }) => ({
        url: `/todo-lists/${todolistId}/tasks/${taskId}`,
        method: "delete",
      }),
      invalidatesTags: ["Tasks"],
      extraOptions: { dataSchema: defaultResponseSchema },
    }),
  }),
});

export const { useGetTasksQuery, useCreateTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation } = tasksApi;
