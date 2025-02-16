import { createAction, createReducer, nanoid } from "@reduxjs/toolkit";
import { FilterValuesType, TodolistType } from "../App";

export const removeTodolistAC = createAction<{ todolistId: string }>(
  "todolists/removeTodolist"
);
export const addTodolistAC = createAction(
  "todolists/addTodolist",
  (title: string) => {
    return { payload: { title, todolistId: nanoid() } };
  }
);

export const changeTodolistTitleAC = createAction<{
  todolistId: string;
  title: string;
}>("todolists/changeTodolistTitle");

export const changeTodolistFilterAC = createAction<{
  filter: FilterValuesType;
  todolistId: string;
}>("todolists/changeTodolistFilter");

const initialState: TodolistType[] = [];

export const todolistsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(removeTodolistAC, (state, action) => {
      const index = state.findIndex(
        (todolist) => todolist.id === action.payload.todolistId
      );
      index !== -1 && state.splice(index, 1);
    })
    .addCase(addTodolistAC, (state, action) => {
      state.push({
        id: action.payload.todolistId,
        title: action.payload.title,
        filter: "All",
      });
    })
    .addCase(changeTodolistTitleAC, (state, action) => {
      const index = state.findIndex(
        (todolist) => todolist.id === action.payload.todolistId
      );
      if (index !== -1) {
        state[index].title = action.payload.title;
      }
    })
    .addCase(changeTodolistFilterAC, (state, action) => {
      const todolist = state.findIndex(
        (todolist) => todolist.id === action.payload.todolistId
      );
      if (todolist !== -1) {
        state[todolist].filter = action.payload.filter;
      }
    });
});
