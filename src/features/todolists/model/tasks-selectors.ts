import { RootState } from "src/app/store";
import type { TaskStateType } from "./tasks-reducer";

export const selectTasks = (state: RootState): TaskStateType => state.tasks;
