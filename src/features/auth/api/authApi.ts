import { instance } from "src/common/instance";
import { BaseTodoResponse } from "src/common/types";
import { Inputs } from "../lib/schemas";

export const authApi = {
  login(payload: Inputs) {
    return instance.post<BaseTodoResponse<{ userId: number; token: string }>>("auth/login", payload);
  },
  logout() {
    return instance.delete<BaseTodoResponse>("auth/login");
  },
  me() {
    return instance.get<BaseTodoResponse<{ id: number; email: string; login: string }>>("auth/me");
  },
};
