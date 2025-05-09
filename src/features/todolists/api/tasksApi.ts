import {
  getTasksSchema,
  TaskOperationResponse,
  TaskOperationResponseSchema,
  type GetTasksResponse,
  type UpdateTaskModel,
} from "./tasksApi.types";
import { defaultResponseSchema } from "src/common/types";
import { baseApi } from "src/app/baseApi";
import { PAGE_SIZE } from "src/common/constants";

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<GetTasksResponse, { todolistId: string; params: { page: number } }>({
      query: ({ todolistId, params }) => ({
        url: `todo-lists/${todolistId}/tasks`,
        params: { ...params, count: PAGE_SIZE },
      }),
      providesTags: (_res, _err, { todolistId }) => [{ type: "Tasks", id: todolistId }],
      extraOptions: { dataSchema: getTasksSchema },
    }),
    createTask: build.mutation<TaskOperationResponse, { todolistId: string; title: string }>({
      query: ({ todolistId, title }) => ({
        url: `/todo-lists/${todolistId}/tasks`,
        method: "post",
        body: { title },
      }),
      invalidatesTags: (_res, _err, { todolistId }) => [{ type: "Tasks", id: todolistId }],
      extraOptions: { dataSchema: TaskOperationResponseSchema },
    }),
    updateTask: build.mutation<TaskOperationResponse, { todolistId: string; taskId: string; model: UpdateTaskModel }>({
      query: ({ todolistId, taskId, model }) => ({
        url: `/todo-lists/${todolistId}/tasks/${taskId}`,
        method: "put",
        body: model,
      }),
      async onQueryStarted({ todolistId, taskId, model }, { dispatch, queryFulfilled, getState }) {
        const cachedArgsForQuery = tasksApi.util.selectCachedArgsForQuery(getState(), "getTasks");

        let patchResults: any[] = [];
        cachedArgsForQuery.forEach(({ params }) => {
          patchResults.push(
            dispatch(
              tasksApi.util.updateQueryData("getTasks", { todolistId, params: { page: params.page } }, (state) => {
                const index = state.items.findIndex((task) => task.id === taskId);
                if (index !== -1) {
                  state.items[index] = { ...state.items[index], ...model };
                }
              }),
            ),
          );
        });
        try {
          await queryFulfilled;
        } catch {
          patchResults.forEach((patchResult) => {
            patchResult.undo();
          });
        }
      },
      invalidatesTags: (_res, _err, { todolistId }) => [{ type: "Tasks", id: todolistId }],
      extraOptions: { dataSchema: TaskOperationResponseSchema },
    }),
    deleteTask: build.mutation<TaskOperationResponse, { todolistId: string; taskId: string }>({
      query: ({ todolistId, taskId }) => ({
        url: `/todo-lists/${todolistId}/tasks/${taskId}`,
        method: "delete",
      }),
      invalidatesTags: (_res, _err, { todolistId }) => [{ type: "Tasks", id: todolistId }],
      extraOptions: { dataSchema: defaultResponseSchema },
    }),
  }),
});

export const { useGetTasksQuery, useCreateTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation } = tasksApi;
