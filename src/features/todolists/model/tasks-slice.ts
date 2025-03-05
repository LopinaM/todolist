import { createSlice, nanoid } from "@reduxjs/toolkit";
import { addTodolistAC, removeTodolistAC } from "./todolists-slice";

export type taskPropsType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type TaskStateType = {
  [key: string]: Array<taskPropsType>;
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {} as TaskStateType,
  selectors: {
    selectTasks: (sliceState) => sliceState,
  },
  reducers: (create) => ({
    removeTaskAC: create.reducer<{ taskId: string; todolistId: string }>((state, action) => {
      const tasks = state[action.payload.todolistId];
      const index = tasks.findIndex((task) => task.id === action.payload.taskId);
      if (index !== -1) {
        tasks.splice(index, 1);
      }
    }),
    addTaskAC: create.preparedReducer(
      (title: string, todolistId: string) => ({ payload: { title, todolistId, taskId: nanoid() } }),
      (state, action) => {
        const newTask = {
          title: action.payload.title,
          isDone: false,
          id: nanoid(),
        };
        state[action.payload.todolistId].unshift(newTask);
      },
    ),
    changeTaskStatusAC: create.reducer<{ taskId: string; isDone: boolean; todolistId: string }>((state, action) => {
      const task = state[action.payload.todolistId].find((task) => task.id === action.payload.taskId);
      if (task) {
        task.isDone = action.payload.isDone;
      }
    }),
    changeTaskTitleAC: create.reducer<{ taskId: string; title: string; todolistId: string }>((state, action) => {
      const task = state[action.payload.todolistId].find((task) => task.id === action.payload.taskId);
      if (task) {
        task.title = action.payload.title;
      }
    }),
  }),
  extraReducers: (builder) => {
    builder
      .addCase(addTodolistAC, (state, action) => {
        state[action.payload.todolistId] = [];
      })
      .addCase(removeTodolistAC, (state, action) => {
        delete state[action.payload.todolistId];
      });
  },
});

export const { removeTaskAC, addTaskAC, changeTaskStatusAC, changeTaskTitleAC } = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
export const { selectTasks } = tasksSlice.selectors;
