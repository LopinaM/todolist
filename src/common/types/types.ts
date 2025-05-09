import { z } from "zod";
import { ResultCode } from "../enums";

export type FieldError = {
  error: string;
  field: string;
};

export type BaseTodoResponse<T = {}> = {
  data: T;
  fieldsErrors: FieldError[];
  messages: string[];
  resultCode: number;
};

const fieldErrorSchema = z.object({
  error: z.string(),
  field: z.string(),
});

export const baseResponseSchema = <T extends z.ZodTypeAny>(schema: T) =>
  z.object({
    data: schema,
    resultCode: z.nativeEnum(ResultCode),
    messages: z.string().array(),
    fieldsErrors: fieldErrorSchema.array(),
  });

export const defaultResponseSchema = baseResponseSchema(z.object({}));
export type DefaultResponse = z.infer<typeof defaultResponseSchema>;

export const LoginResponseSchema = baseResponseSchema(
  z.object({
    userId: z.number(),
    token: z.string(),
  }),
);

export type LoginResponse = z.infer<typeof LoginResponseSchema>;

export type RequestStatus = "idle" | "loading" | "succeeded" | "failed";
