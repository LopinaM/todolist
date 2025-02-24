import { instance } from "src/common/instance";
import type { GetTasksResponse, Task, UpdateTaskModel } from "./tasksApi.types";
import { BaseTodoResponse } from "src/common/types";

export const tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`).then((res) => res.data);
  },
  createTask(todolistId: string, title: string) {
    return instance.post<BaseTodoResponse<{ item: Task }>>(`/todo-lists/${todolistId}/tasks`, { title });
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModel) {
    return instance.put<BaseTodoResponse<{ item: Task }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model);
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<BaseTodoResponse>(`/todo-lists/${todolistId}/tasks/${taskId}`);
  },
};
