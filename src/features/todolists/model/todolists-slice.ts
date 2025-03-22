import { createAsyncThunk } from "@reduxjs/toolkit";
import { Todolist } from "../api/todolistsApi.types";
import { todolistsApi } from "../api/todolistsApi";
import { createAppSlice } from "src/common/utils";
import { setAppStatusAC } from "src/app/app-clice";

export type FilterValuesType = "All" | "Completed" | "Active";

export type TodolistType = Todolist & {
  filter: FilterValuesType;
};

export const todolistsSlice = createAppSlice({
  name: "todolists",
  initialState: [] as TodolistType[],
  //лучше всегда делать initialState {}
  // initialState: {
  //   todolists: [] as TodolistType[],
  // },
  selectors: {
    selectTodolists: (state) => state,
  },
  reducers: (create) => ({
    //actions
    changeTodolistFilterAC: create.reducer<{ filter: FilterValuesType; todolistId: string }>((state, action) => {
      const todolist = state.findIndex((todolist) => todolist.id === action.payload.todolistId);
      if (todolist !== -1) {
        state[todolist].filter = action.payload.filter;
      }
    }),
    //async actions (thunk)
    fetchTodolistsTC: create.asyncThunk(
      async (_, thunkAPI) => {
        try {
          thunkAPI.dispatch(setAppStatusAC({ status: "loading" }));
          const res = await todolistsApi.getTodolists();
          thunkAPI.dispatch(setAppStatusAC({ status: "succeeded" }));
          return { todolists: res.data };
        } catch (error) {
          thunkAPI.dispatch(setAppStatusAC({ status: "failed" }));
          return thunkAPI.rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          action.payload?.todolists.forEach((tl) => {
            state.push({ ...tl, filter: "All" });
          });
          // action.payload?.todolists.map((tl) => state.push({ ...tl, filter: "All" }));
        },
      },
    ),

    createTodolist: create.asyncThunk(
      async (args: { title: string }, thunkAPI) => {
        try {
          thunkAPI.dispatch(setAppStatusAC({ status: "loading" }));
          const res = await todolistsApi.createTodolist(args.title);
          thunkAPI.dispatch(setAppStatusAC({ status: "succeeded" }));
          return { todolist: res.data.data.item };
        } catch (error) {
          thunkAPI.dispatch(setAppStatusAC({ status: "failed" }));
          return thunkAPI.rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          state.unshift({ ...action.payload.todolist, filter: "All" });
        },
      },
    ),

    deleteTodolist: create.asyncThunk(
      async (todolistId: string, thunkAPI) => {
        try {
          thunkAPI.dispatch(setAppStatusAC({ status: "loading" }));
          await todolistsApi.deleteTodolist(todolistId);
          thunkAPI.dispatch(setAppStatusAC({ status: "succeeded" }));
          return { todolistId };
        } catch (error) {
          thunkAPI.dispatch(setAppStatusAC({ status: "failed" }));
          return thunkAPI.rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          const index = state.findIndex((todolist) => todolist.id === action.payload.todolistId);
          index !== -1 && state.splice(index, 1);
        },
      },
    ),

    changeTodolistTitle: create.asyncThunk(
      async (args: { id: string; title: string }, thunkAPI) => {
        try {
          thunkAPI.dispatch(setAppStatusAC({ status: "loading" }));
          await todolistsApi.changeTodolistTitle(args.id, args.title);
          thunkAPI.dispatch(setAppStatusAC({ status: "succeeded" }));
          return args;
        } catch (error) {
          thunkAPI.dispatch(setAppStatusAC({ status: "failed" }));
          return thunkAPI.rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          const index = state.findIndex((todolist) => todolist.id === action.payload.id);
          if (index !== -1) {
            state[index].title = action.payload.title;
          }
        },
      },
    ),
  }),
});

export const { changeTodolistFilterAC, fetchTodolistsTC, createTodolist, deleteTodolist, changeTodolistTitle } =
  todolistsSlice.actions;
export const { selectTodolists } = todolistsSlice.selectors;

export const todolistsReducer = todolistsSlice.reducer;
