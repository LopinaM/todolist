import { createAppSlice, handleServerAppError, handleServerNetworkError } from "src/common/utils";
import { _tasksApi } from "../api/tasksApi";
import { Task, UpdateTaskModel } from "../api/tasksApi.types";
import { setAppStatusAC } from "src/app/app-clice";
import { ResultCode } from "src/common/enums";
import { clearDataAC } from "src/common/actions";
import { createTodolist, deleteTodolist } from "./todolists-slice";

export type TaskStateType = {
  [key: string]: Array<Task>;
  // entityStatus: RequestStatus;
};

export const tasksSlice = createAppSlice({
  name: "tasks",
  initialState: {} as TaskStateType,

  reducers: (create) => ({
    // updateTask: create.asyncThunk(
    //   async (task: Task, thunkAPI) => {
    //     const model: UpdateTaskModel = { ...task };
    //     try {
    //       thunkAPI.dispatch(setAppStatusAC({ status: "loading" }));
    //       const res = await _tasksApi.updateTask({ todolistId: task.todoListId, taskId: task.id, model });
    //       if (res.data.resultCode === ResultCode.Success) {
    //         thunkAPI.dispatch(setAppStatusAC({ status: "succeeded" }));
    //         return { task: res.data.data.item };
    //       } else {
    //         handleServerAppError(res.data, thunkAPI.dispatch);
    //         return thunkAPI.rejectWithValue(null);
    //       }
    //     } catch (error) {
    //       handleServerNetworkError(error, thunkAPI.dispatch);
    //       return thunkAPI.rejectWithValue(null);
    //     }
    //   },
    //   {
    //     fulfilled: (state, action) => {
    //       const allTodolistTasks = state[action.payload.task.todoListId];
    //       const taskIndex = allTodolistTasks.findIndex((task) => task.id === action.payload.task.id);
    //       if (taskIndex !== -1) {
    //         allTodolistTasks[taskIndex] = action.payload.task;
    //       }
    //     },
    //   },
    // ),
  }),
  extraReducers: (builder) => {
    builder.addCase(createTodolist.fulfilled, (state, action) => {
      state[action.payload.todolist.id] = [];
    });
    builder.addCase(deleteTodolist.fulfilled, (state, action) => {
      delete state[action.payload.todolistId];
    });
    builder.addCase(clearDataAC, () => {
      return {};
    });
  },
});

export const tasksReducer = tasksSlice.reducer;
