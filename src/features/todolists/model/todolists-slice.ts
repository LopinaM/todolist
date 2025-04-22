import { Todolist } from "../api/todolistsApi.types";
import { todolistsApi } from "../api/todolistsApi";
import { createAppSlice, handleServerAppError, handleServerNetworkError } from "src/common/utils";
import { setAppStatusAC } from "src/app/app-clice";
import { RequestStatus } from "src/common/types";
import { ResultCode } from "src/common/enums";

export type FilterValuesType = "All" | "Completed" | "Active";

export type TodolistType = Todolist & {
  filter: FilterValuesType;
  entityStatus: RequestStatus;
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
    changeTodolistStatusAC: create.reducer<{ entityStatus: RequestStatus; todolistId: string }>((state, action) => {
      const todolist = state.findIndex((todolist) => todolist.id === action.payload.todolistId);
      if (todolist !== -1) {
        state[todolist].entityStatus = action.payload.entityStatus;
      }
    }),
    //async actions (thunk)
    fetchTodolistsTC: create.asyncThunk(
      async (_, thunkAPI) => {
        try {
          thunkAPI.dispatch(setAppStatusAC({ status: "loading" }));
          const res = await todolistsApi.getTodolists();
          // const tasks = TodolistSchema.array().parse(res.data);
          thunkAPI.dispatch(setAppStatusAC({ status: "succeeded" }));
          return { todolists: res.data };
        } catch (error) {
          thunkAPI.dispatch(setAppStatusAC({ status: "failed" }));
          return thunkAPI.rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          // action.payload?.todolists.forEach((tl) => {
          //   state.push({ ...tl, filter: "All", entityStatus: "idle" });
          // });

          return action.payload.todolists.map((tl) => {
            return { ...tl, filter: "All", entityStatus: "idle" };
          });
        },
      },
    ),

    createTodolist: create.asyncThunk(
      async (args: { title: string }, thunkAPI) => {
        try {
          thunkAPI.dispatch(setAppStatusAC({ status: "loading" }));
          const res = await todolistsApi.createTodolist(args.title);

          if (res.data.resultCode === ResultCode.Success) {
            thunkAPI.dispatch(setAppStatusAC({ status: "succeeded" }));
            return { todolist: res.data.data.item };
          } else {
            handleServerAppError(res.data, thunkAPI.dispatch);
            return thunkAPI.rejectWithValue(null);
          }
        } catch (error) {
          handleServerNetworkError(error, thunkAPI.dispatch);
          return thunkAPI.rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          state.unshift({ ...action.payload.todolist, filter: "All", entityStatus: "idle" });
        },
      },
    ),

    deleteTodolist: create.asyncThunk(
      async (todolistId: string, thunkAPI) => {
        try {
          thunkAPI.dispatch(setAppStatusAC({ status: "loading" }));
          thunkAPI.dispatch(changeTodolistStatusAC({ todolistId, entityStatus: "loading" }));
          const res = await todolistsApi.deleteTodolist(todolistId);
          if (res.data.resultCode === ResultCode.Success) {
            thunkAPI.dispatch(setAppStatusAC({ status: "succeeded" }));
            return { todolistId };
          } else {
            thunkAPI.dispatch(changeTodolistStatusAC({ todolistId, entityStatus: "failed" }));
            handleServerAppError(res.data, thunkAPI.dispatch);
            return thunkAPI.rejectWithValue(null);
          }
        } catch (error) {
          handleServerNetworkError(error, thunkAPI.dispatch);
          thunkAPI.dispatch(changeTodolistStatusAC({ todolistId, entityStatus: "failed" }));
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
          const res = await todolistsApi.changeTodolistTitle(args.id, args.title);
          if (res.data.resultCode === ResultCode.Success) {
            thunkAPI.dispatch(setAppStatusAC({ status: "succeeded" }));
            return args;
          } else {
            handleServerAppError(res.data, thunkAPI.dispatch);
            return thunkAPI.rejectWithValue(null);
          }
        } catch (error) {
          handleServerNetworkError(error, thunkAPI.dispatch);
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

export const {
  changeTodolistFilterAC,
  changeTodolistStatusAC,
  fetchTodolistsTC,
  createTodolist,
  deleteTodolist,
  changeTodolistTitle,
} = todolistsSlice.actions;
export const { selectTodolists } = todolistsSlice.selectors;

export const todolistsReducer = todolistsSlice.reducer;
