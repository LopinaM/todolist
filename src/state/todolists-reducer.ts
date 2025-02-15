import { v1 } from "uuid";
import { FilterValuesType, TodolistType } from "../App";

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
    // case "REMOVE-TODOLIST": {
    //   return state.filter((tl) => tl.id !== action.payload.todolistId);
    // }

    case "REMOVE-TODOLIST": {
      return [...state.filter((tl) => tl.id !== action.payload.todolistId)];
    }

    case "ADD-TODOLIST": {
      const newTodolist: TodolistType = {
        id: action.payload.todolistId,
        title: action.payload.title,
        filter: "All",
      };
      return [newTodolist, ...state];
    }

    case "CHANGE-TODOLIST-TITLE": {
      const todolist = state.find((td) => td.id === action.payload.todolistId);
      if (todolist) {
        todolist.title = action.payload.title;
      }
      return [...state];
    }

    case "CHANGE-TODOLIST-FILTER": {
      const todolist = state.find((td) => td.id === action.payload.todolistId);
      if (todolist) {
        todolist.filter = action.payload.filter;
      }
      return [...state];
    }

    default:
      return state;
  }
};

export const removeTodolistAC = (todolistId: string) =>
  ({ type: "REMOVE-TODOLIST", payload: { todolistId } } as const);

export const addTodolistAC = (title: string) =>
  ({ type: "ADD-TODOLIST", payload: { title, todolistId: v1() } } as const);

export const changeTodolistTitleAC = (payload: {
  todolistId: string;
  title: string;
}) => ({ type: "CHANGE-TODOLIST-TITLE", payload } as const);

export const changeTodolistFilterAC = (payload: {
  filter: FilterValuesType;
  todolistId: string;
}) => ({ type: "CHANGE-TODOLIST-FILTER", payload } as const);

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type ChangeTodolistTitleActionType = ReturnType<
  typeof changeTodolistTitleAC
>;
export type ChangeTodolistFilterActionType = ReturnType<
  typeof changeTodolistFilterAC
>;
