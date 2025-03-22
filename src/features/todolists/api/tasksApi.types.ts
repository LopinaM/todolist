import { TaskPriority, TaskStatus } from "src/common/enums";

export type Task = {
  description: string | null;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  startDate: string | null;
  deadline: string | null;

  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};

export type GetTasksResponse = {
  error: string | null;
  totalCount: number;
  items: Task[];
};

export type UpdateTaskModel = {
  description: string | null;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  startDate: string | null;
  deadline: string | null;
};
