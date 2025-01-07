import { v1 } from "uuid";
import { FilterValuesType, TodolistType } from "../App";

type RemoveTodolistActionType = {
  type: "REMOVE-TODOLIST";
  id: string;
};
type AddTodolistActionType = {
  type: "ADD-TODOLIST";
  title: string;
};
type ChangeTodolistTitleActionType = {
  type: "CHANGE-TODOLIST-TITLE";
  id: string;
  title: string;
};
type ChangeTodolistFilterActionType = {
  type: "CHANGE-TODOLIST-FILTER";
  id: string;
  filter: FilterValuesType;
};

type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType;

export const todolistsReducer = (
  state: TodolistType[],
  action: ActionsType
): TodolistType[] => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter((tl) => tl.id !== action.id);
    }
    case "ADD-TODOLIST":
      return [...state, { id: v1(), title: action.title, filter: "All" }];

    case "CHANGE-TODOLIST-TITLE": {
      const todolist = state.find((td) => td.id === action.id);
      if (todolist) {
        todolist.title = action.title;
      }
      return [...state];
    }

    case "CHANGE-TODOLIST-FILTER": {
      const todolist = state.find((td) => td.id === action.id);
      if (todolist) {
        todolist.filter = action.filter;
      }
      return [...state];
    }

    default:
      throw new Error("I don't understand this acton type ");
  }
};

export const RemoveTodolistAC = (
  todolistId: string
): RemoveTodolistActionType => {
  return { type: "REMOVE-TODOLIST", id: todolistId };
};

export const AddTodolistAC = (title: string): AddTodolistActionType => {
  return { type: "ADD-TODOLIST", title: title };
};

export const ChangeTodolistTitleAC = (
  id: string,
  title: string
): ChangeTodolistTitleActionType => {
  return { type: "CHANGE-TODOLIST-TITLE", id: id, title: title };
};

export const ChangeTodolistFilterAC = (
  id: string,
  filter: FilterValuesType
): ChangeTodolistFilterActionType => {
  return { type: "CHANGE-TODOLIST-FILTER", id: id, filter: filter };
};
