import { createAppSlice, handleServerAppError, handleServerNetworkError } from "src/common/utils";
import { tasksApi } from "../api/tasksApi";
import { Task, UpdateTaskModel } from "../api/tasksApi.types";
import { setAppStatusAC } from "src/app/app-clice";
import { createTodolist, deleteTodolist } from "./todolists-slice";
import { ResultCode } from "src/common/enums";
import { RequestStatus } from "src/common/types";
import { current } from "@reduxjs/toolkit";
import { clearDataAC } from "src/common/actions";

export type TaskStateType = {
  [key: string]: Array<Task>;
  // entityStatus: RequestStatus;
};

export const tasksSlice = createAppSlice({
  name: "tasks",
  initialState: {} as TaskStateType,
  selectors: {
    selectTasks: (sliceState) => sliceState,
  },
  reducers: (create) => ({
    fetchTasksTC: create.asyncThunk(
      async (todolistId: string, thunkAPI) => {
        try {
          thunkAPI.dispatch(setAppStatusAC({ status: "loading" }));
          const res = await tasksApi.getTasks(todolistId);
          // const tasks = TaskSchema.array().parse(res.items);
          thunkAPI.dispatch(setAppStatusAC({ status: "succeeded" }));
          return { todolistId, tasks: res.items };
        } catch (error) {
          // console.log(error);
          thunkAPI.dispatch(setAppStatusAC({ status: "failed" }));
          return thunkAPI.rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          state[action.payload.todolistId] = action.payload.tasks;
        },
      },
    ),

    createTask: create.asyncThunk(
      async (args: { todolistId: string; title: string }, thunkAPI) => {
        try {
          thunkAPI.dispatch(setAppStatusAC({ status: "loading" }));
          const res = await tasksApi.createTask(args.todolistId, args.title);
          if (res.data.resultCode === ResultCode.Success) {
            thunkAPI.dispatch(setAppStatusAC({ status: "succeeded" }));
            return { task: res.data.data.item };
          } else {
            handleServerAppError(res.data, thunkAPI.dispatch);
            return thunkAPI.rejectWithValue(null);
          }
        } catch (error) {
          handleServerNetworkError(error, thunkAPI.dispatch);
          return thunkAPI.rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          state[action.payload.task.todoListId].unshift(action.payload.task);
        },
      },
    ),

    deleteTask: create.asyncThunk(
      async (payload: { todolistId: string; taskId: string }, thunkAPI) => {
        try {
          thunkAPI.dispatch(setAppStatusAC({ status: "loading" }));
          const res = await tasksApi.deleteTask(payload.todolistId, payload.taskId);
          if (res.data.resultCode === ResultCode.Success) {
            thunkAPI.dispatch(setAppStatusAC({ status: "succeeded" }));
            return payload;
          } else {
            handleServerAppError(res.data, thunkAPI.dispatch);
            return thunkAPI.rejectWithValue(null);
          }
        } catch (error) {
          handleServerNetworkError(error, thunkAPI.dispatch);
          return thunkAPI.rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          const tasks = state[action.payload.todolistId];
          const index = tasks.findIndex((task) => task.id === action.payload.taskId);
          if (index !== -1) {
            tasks.splice(index, 1);
          }
        },
      },
    ),

    updateTask: create.asyncThunk(
      async (task: Task, thunkAPI) => {
        // const model: UpdateTaskModel = {
        //   description: task.description,
        //   title: task.title,
        //   priority: task.priority,
        //   startDate: task.startDate,
        //   deadline: task.deadline,
        //   status: task.status,
        // };

        const model: UpdateTaskModel = { ...task };

        try {
          thunkAPI.dispatch(setAppStatusAC({ status: "loading" }));
          const res = await tasksApi.updateTask({ todolistId: task.todoListId, taskId: task.id, model });
          if (res.data.resultCode === ResultCode.Success) {
            thunkAPI.dispatch(setAppStatusAC({ status: "succeeded" }));
            return { task: res.data.data.item };
          } else {
            handleServerAppError(res.data, thunkAPI.dispatch);
            return thunkAPI.rejectWithValue(null);
          }
        } catch (error) {
          handleServerNetworkError(error, thunkAPI.dispatch);
          return thunkAPI.rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          const allTodolistTasks = state[action.payload.task.todoListId];
          const taskIndex = allTodolistTasks.findIndex((task) => task.id === action.payload.task.id);
          if (taskIndex !== -1) {
            allTodolistTasks[taskIndex] = action.payload.task;
          }
        },
      },
    ),
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

export const { fetchTasksTC, createTask, deleteTask, updateTask } = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
export const { selectTasks } = tasksSlice.selectors;
