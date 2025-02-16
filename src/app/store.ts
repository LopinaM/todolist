import { todolistsReducer } from "src/features/todolists/model/todolists-reducer";
import { tasksReducer } from "src/features/todolists/model/tasks-reducer";
import { appReducer } from "./app-reducer";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

// автоматическое определение типа всего объекта состояния
export type RootState = ReturnType<typeof store.getState>;
// автоматическое определение типа метода dispatch
export type AppDispatch = typeof store.dispatch;

// это чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
