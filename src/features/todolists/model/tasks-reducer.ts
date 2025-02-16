import { createAction, createReducer, nanoid } from "@reduxjs/toolkit";
import { addTodolistAC, removeTodolistAC } from "./todolists-reducer";

export type taskPropsType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type TaskStateType = {
  [key: string]: Array<taskPropsType>;
};

export const removeTaskAC = createAction<{
  taskId: string;
  todolistId: string;
}>("tasks/removeTask");

export const addTaskAC = createAction(
  "tasks/addTask",
  (title: string, todolistId: string) => {
    return { payload: { title, todolistId, taskId: nanoid() } };
  }
);

export const changeTaskTitleAC = createAction<{
  taskId: string;
  title: string;
  todolistId: string;
}>("tasks/changeTaskTitle");

export const changeTaskStatusAC = createAction<{
  taskId: string;
  isDone: boolean;
  todolistId: string;
}>("tasks/changeTaskStatus");

const initialState: TaskStateType = {};

export const tasksReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(removeTaskAC, (state, action) => {
      const tasks = state[action.payload.todolistId];
      const index = tasks.findIndex(
        (task) => task.id === action.payload.taskId
      );
      if (index !== -1) {
        tasks.splice(index, 1);
      }
    })
    .addCase(addTaskAC, (state, action) => {
      const newTask = {
        title: action.payload.title,
        isDone: false,
        id: nanoid(),
      };
      state[action.payload.todolistId].unshift(newTask);
    })
    .addCase(changeTaskStatusAC, (state, action) => {
      const task = state[action.payload.todolistId].find(
        (task) => task.id === action.payload.taskId
      );
      if (task) {
        task.isDone = action.payload.isDone;
      }
    })
    .addCase(changeTaskTitleAC, (state, action) => {
      const task = state[action.payload.todolistId].find(
        (task) => task.id === action.payload.taskId
      );
      if (task) {
        task.title = action.payload.title;
      }
    })
    .addCase(addTodolistAC, (state, action) => {
      state[action.payload.todolistId] = [];
    })
    .addCase(removeTodolistAC, (state, action) => {
      delete state[action.payload.todolistId];
    });
});
