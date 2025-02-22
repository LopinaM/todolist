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
