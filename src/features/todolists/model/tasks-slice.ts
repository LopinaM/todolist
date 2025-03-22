import { nanoid } from "@reduxjs/toolkit";
import { addTodolistTC, removeTodolistTC } from "./todolists-slice";
import { createAppSlice } from "src/common/utils";
import { tasksApi } from "../api/tasksApi";
import { Task, UpdateTaskModel, updateTaskType } from "../api/tasksApi.types";
import { TaskPriority, TaskStatus } from "src/common/enums";
import { RootState } from "src/app/store";
import { setAppStatusAC } from "src/app/app-clice";

export type taskPropsType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type TaskStateType = {
  [key: string]: Array<Task>;
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
          thunkAPI.dispatch(setAppStatusAC({ status: "succeeded" }));
          return { todolistId, tasks: res.items };
        } catch (error) {
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
          thunkAPI.dispatch(setAppStatusAC({ status: "succeeded" }));
          return { task: res.data.data.item };
        } catch (error) {
          thunkAPI.dispatch(setAppStatusAC({ status: "failed" }));
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
          await tasksApi.deleteTask(payload.todolistId, payload.taskId);
          return payload;
        } catch (error) {
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

    changeTaskStatus: create.asyncThunk(
      async (payload: { todolistId: string; taskId: string; status: TaskStatus }, thunkAPI) => {
        const { todolistId, taskId, status } = payload;

        // В области видимости changeTaskStatus нет переменной task, нужной для создания объекта model.
        // Для решения проблемы можно передать в thunk creator изменяемую таску целиком,
        // но также можно достать таску из state с помощью метода getState из thunkAPI.
        // getState дает доступ ко всему стейту приложения внутри санки.

        // const state = thunkAPI.getState() as RootState;
        // const tasks = state.tasks;
        // const allTodolistTasks = tasks[todolistId]

        const allTodolistTasks = (thunkAPI.getState() as RootState).tasks[todolistId];
        const task = allTodolistTasks.find((task) => task.id === taskId);

        if (!task) {
          return thunkAPI.rejectWithValue(null);
        }

        const model: UpdateTaskModel = {
          description: task.description,
          title: task.title,
          priority: task.priority,
          startDate: task.startDate,
          deadline: task.deadline,
          status,
        };

        try {
          thunkAPI.dispatch(setAppStatusAC({ status: "loading" }));
          const res = await tasksApi.updateTask({ todolistId, taskId, model });
          thunkAPI.dispatch(setAppStatusAC({ status: "succeeded" }));
          return { task: res.data.data.item };
        } catch (error) {
          thunkAPI.dispatch(setAppStatusAC({ status: "failed" }));
          return thunkAPI.rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          const task = state[action.payload.task.todoListId].find((task) => task.id === action.payload.task.id);
          if (task) {
            task.status = action.payload.task.status;
          }
        },
      },
    ),

    changeTaskTitle: create.asyncThunk(
      async (payload: { todolistId: string; taskId: string; title: string }, thunkAPI) => {
        const { todolistId, taskId, title } = payload;

        const allTodolistTasks = (thunkAPI.getState() as RootState).tasks[todolistId];
        const task = allTodolistTasks.find((task) => task.id === taskId);

        if (!task) {
          return thunkAPI.rejectWithValue(null);
        }

        const model: UpdateTaskModel = {
          description: task.description,
          priority: task.priority,
          startDate: task.startDate,
          deadline: task.deadline,
          status: task.status,
          title,
        };

        try {
          thunkAPI.dispatch(setAppStatusAC({ status: "loading" }));
          const res = await tasksApi.updateTask({ todolistId, taskId, model });
          thunkAPI.dispatch(setAppStatusAC({ status: "succeeded" }));
          return { task: res.data.data.item };
        } catch (error) {
          thunkAPI.dispatch(setAppStatusAC({ status: "failed" }));
          return thunkAPI.rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          const task = state[action.payload.task.todoListId].find((task) => task.id === action.payload.task.id);
          if (task) {
            task.title = action.payload.task.title;
          }
        },
      },
    ),
  }),
  extraReducers: (builder) => {
    builder.addCase(addTodolistTC.fulfilled, (state, action) => {
      state[action.payload.todolist.id] = [];
    });
    builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
      delete state[action.payload.todolistId];
    });
  },
});

export const { fetchTasksTC, createTask, deleteTask, changeTaskStatus, changeTaskTitle } = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
export const { selectTasks } = tasksSlice.selectors;
