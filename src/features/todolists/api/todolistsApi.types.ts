import { baseResponseSchema } from "src/common/types";
import { z } from "zod";

export const TodolistSchema = z.object({
  id: z.string(),
  title: z.string(),
  addedDate: z.string(),
  order: z.number(),
});

export type Todolist = z.infer<typeof TodolistSchema>;

export const CreateTodolistResponseSchema = baseResponseSchema(
  z.object({
    item: TodolistSchema,
  }),
);

export type CreateTodolistResponse = z.infer<typeof CreateTodolistResponseSchema>;
