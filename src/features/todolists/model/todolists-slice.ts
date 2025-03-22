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
  name: "todolist",
  initialState: [] as TodolistType[],
  //лучше всегда делать initialState {}
  // initialState: {
  //   todolists: [] as TodolistType[],
  // },
  selectors: {
    selectTodolists: (state) => state,
  },
  extraReducers: (builder) => {
    // builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
    //   return action.payload.todolists.map((todolist) => ({ ...todolist, filter: "All" }));
    // });

    builder.addCase(addTodolistTC.fulfilled, (state, action) => {
      state.unshift({ ...action.payload.todolist, filter: "All" });
    });

    builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
      const index = state.findIndex((todolist) => todolist.id === action.payload.todolistId);
      index !== -1 && state.splice(index, 1);
    });

    builder.addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
      const index = state.findIndex((todolist) => todolist.id === action.payload.id);
      if (index !== -1) {
        state[index].title = action.payload.title;
      }
    });
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
  }),
});

export const changeTodolistTitleTC = createAsyncThunk(
  `${todolistsSlice.name}/changeTodolistTitleTC`,
  async (args: { id: string; title: string }, thunkAPI) => {
    try {
      await todolistsApi.changeTodolistTitle(args.id, args.title);
      return args;
    } catch (error) {
      return thunkAPI.rejectWithValue(null);
    }
  },
);

export const removeTodolistTC = createAsyncThunk(
  `${todolistsSlice.name}/removeTodolistTC`,
  async (todolistId: string, thunkAPI) => {
    try {
      await todolistsApi.deleteTodolist(todolistId);
      return { todolistId };
    } catch (error) {
      return thunkAPI.rejectWithValue(null);
    }
  },
);

export const addTodolistTC = createAsyncThunk(
  `${todolistsSlice.name}/addTodolistTC`,
  async (args: { title: string }, thunkAPI) => {
    try {
      const res = await todolistsApi.createTodolist(args.title);
      return { todolist: res.data.data.item };
    } catch (error) {
      return thunkAPI.rejectWithValue(null);
    }
  },
);

export const { changeTodolistFilterAC, fetchTodolistsTC } = todolistsSlice.actions;
export const { selectTodolists } = todolistsSlice.selectors;

export const todolistsReducer = todolistsSlice.reducer;
