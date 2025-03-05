import { RootState } from "src/app/store";
import type { TodolistType } from "./todolists-slice";

export const selectTodolists = (state: RootState): TodolistType[] => state.todolists;
