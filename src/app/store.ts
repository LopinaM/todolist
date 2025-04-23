import { todolistsReducer } from "src/features/todolists/model/todolists-slice";
import { tasksReducer } from "src/features/todolists/model/tasks-slice";
import { appReducer } from "./app-clice";
import { configureStore } from "@reduxjs/toolkit";
import { authReducer, authSlice } from "src/features/auth/model/auth-slice";
import { todolistsApi } from "src/features/todolists/api/todolistsApi";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    [authSlice.name]: authReducer,
    [todolistsApi.reducerPath]: todolistsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todolistsApi.middleware),
});

setupListeners(store.dispatch);

// автоматическое определение типа всего объекта состояния
export type RootState = ReturnType<typeof store.getState>;
// автоматическое определение типа метода dispatch
export type AppDispatch = typeof store.dispatch;

// это чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
