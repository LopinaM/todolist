import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { Todolist } from "../api/todolistsApi.types";
import { todolistsApi } from "../api/todolistsApi";

export type FilterValuesType = "All" | "Completed" | "Active";

export type TodolistType = Todolist & {
  filter: FilterValuesType;
};

export const todolistsSlice = createSlice({
  name: "todolist",
  initialState: [] as TodolistType[],
  //лучше всегда делать initialState {}
  // initialState: {
  //   todolists: [] as TodolistType[],
  // },
  selectors: {
    selectTodolists: (sliceState) => sliceState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
      return action.payload.todolists.map((todolist) => ({ ...todolist, filter: "All" }));
    });
    builder.addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
      const index = state.findIndex((todolist) => todolist.id === action.payload.id);
      if (index !== -1) {
        state[index].title = action.payload.title;
      }
    });
  },
  reducers: (create) => ({
    setTodolistsAC: create.reducer<{ todolists: Todolist[] }>((state, action) => {
      //v1
      // action.payload.todolists.forEach((todolist) => {
      //   state.push({ ...todolist, filter: "All" });
      // });
      //v2
      return action.payload.todolists.map((todolist) => ({ ...todolist, filter: "All" }));
    }),

    removeTodolistAC: create.reducer<{ todolistId: string }>((state, action) => {
      const index = state.findIndex((todolist) => todolist.id === action.payload.todolistId);
      index !== -1 && state.splice(index, 1);
    }),

    changeTodolistFilterAC: create.reducer<{ filter: FilterValuesType; todolistId: string }>((state, action) => {
      const todolist = state.findIndex((todolist) => todolist.id === action.payload.todolistId);
      if (todolist !== -1) {
        state[todolist].filter = action.payload.filter;
      }
    }),

    addTodolistAC: create.preparedReducer(
      (title: string) => ({ payload: { title, todolistId: nanoid() } }),
      (state, action) => {
        state.push({
          id: action.payload.todolistId,
          title: action.payload.title,
          filter: "All",
          addedDate: "",
          order: 0,
        });
      },
    ),
  }),
});

export const fetchTodolistsTC = createAsyncThunk(`${todolistsSlice.name}/fetchTodolistsTC`, async (_, thunkAPI) => {
  try {
    const res = await todolistsApi.getTodolists();
    return { todolists: res.data };
  } catch (error) {
    return thunkAPI.rejectWithValue(null);
  }
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

export const { setTodolistsAC, removeTodolistAC, addTodolistAC, changeTodolistFilterAC } = todolistsSlice.actions;
export const { selectTodolists } = todolistsSlice.selectors;

export const todolistsReducer = todolistsSlice.reducer;
