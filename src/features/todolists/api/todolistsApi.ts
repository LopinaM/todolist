import { instance } from "src/common/instance";
import { Todolist } from "./todolistsApi.types";
import type { BaseTodoResponse } from "src/common/types";

export const todolistsApi = {
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
