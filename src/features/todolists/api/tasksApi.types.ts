import { TaskPriority, TaskStatus } from "src/common/enums";
import { z } from "zod";

export const TaskSchema = z.object({
  description: z.string().nullable(),
  title: z.string(),
  status: z.nativeEnum(TaskStatus),
  priority: z.nativeEnum(TaskPriority),
  startDate: z.string().nullable(),
  deadline: z.string().nullable(),

  id: z.string(),
  todoListId: z.string(),
  order: z.number(),
  addedDate: z.string(),
});

export type Task = z.infer<typeof TaskSchema>;

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
