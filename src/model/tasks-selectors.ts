import { TaskStateType } from "../App";
import type { RootState } from "../app/store";

export const selectTasks = (state: RootState): TaskStateType => state.tasks;
