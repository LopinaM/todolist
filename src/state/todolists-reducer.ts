import { v1 } from "uuid";
import { FilterValuesType, TodolistType } from "../App";

export type RemoveTodolistActionType = {
  type: "REMOVE-TODOLIST";
  id: string;
};
export type AddTodolistActionType = {
  type: "ADD-TODOLIST";
  payload: {
    title: string;
    todolistId: string;
  };
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

export let todolistId1 = v1();
export let todolistId2 = v1();

const initialState: TodolistType[] = [];

export const todolistsReducer = (
  state: TodolistType[] = initialState,
  action: ActionsType
): TodolistType[] => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter((tl) => tl.id !== action.id);
    }
    // case "ADD-TODOLIST":
    //   return [...state, { id: v1(), title: action.title, filter: "All" }];

    case "ADD-TODOLIST": {
      const newTodolist: TodolistType = {
        id: action.payload.todolistId,
        title: action.payload.title,
        filter: "All",
      };
      return [newTodolist, ...state];
    }

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
      return state;
  }
};

export const removeTodolistAC = (
  todolistId: string
): RemoveTodolistActionType => {
  return { type: "REMOVE-TODOLIST", id: todolistId };
};

export const addTodolistAC = (title: string) => {
  return {
    type: "ADD-TODOLIST",
    payload: { title, todolistId: v1() },
  } as const;
};

export const changeTodolistTitleAC = (
  id: string,
  title: string
): ChangeTodolistTitleActionType => {
  return { type: "CHANGE-TODOLIST-TITLE", id: id, title: title };
};

export const changeTodolistFilterAC = (
  filter: FilterValuesType,
  id: string
): ChangeTodolistFilterActionType => {
  return { type: "CHANGE-TODOLIST-FILTER", id: id, filter: filter };
};
