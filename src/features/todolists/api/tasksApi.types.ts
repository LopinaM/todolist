import { TaskPriority, TaskStatus } from "src/common/enums";
import { baseResponseSchema } from "src/common/types";
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
  addedDate: z.string().datetime({ local: true }),
});

export type Task = z.infer<typeof TaskSchema>;

export const getTasksSchema = z.object({
  error: z.string().nullable(),
  totalCount: z.number().int().nonnegative(),
  items: TaskSchema.array(),
});

export type GetTasksResponse = z.infer<typeof getTasksSchema>;

export const TaskOperationResponseSchema = baseResponseSchema(
  z.object({
    item: TaskSchema,
  }),
);

export type TaskOperationResponse = z.infer<typeof TaskOperationResponseSchema>;

export type UpdateTaskModel = {
  description: string | null;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  startDate: string | null;
  deadline: string | null;
};
