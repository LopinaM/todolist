import { RequestStatus } from "src/common/types";
import { Todolist } from "../../api/todolistsApi.types";

export type FilterValuesType = "All" | "Completed" | "Active";

export type TodolistType = Todolist & {
  filter: FilterValuesType;
  entityStatus: RequestStatus;
};
