import {
  createTodolist,
  changeTodolistFilterAC,
  changeTodolistTitle,
  FilterValuesType,
  deleteTodolist,
  todolistsReducer,
  TodolistType,
} from "../todolists-slice";
import { nanoid } from "@reduxjs/toolkit";

let todolistId1 = nanoid();
let todolistId2 = nanoid();

let newTodolistTitle = "New Todolist";
let newFilter: FilterValuesType = "Completed";

let startState: Array<TodolistType> = [];

beforeEach(() => {
  startState = [
    { id: todolistId1, title: "What to learn", addedDate: "", order: 0, filter: "All" },
    { id: todolistId2, title: "What to buy", addedDate: "", order: 0, filter: "All" },
  ];
});

test("correct todolist should be deleted", () => {
  const endState = todolistsReducer(
    startState,
    deleteTodolist.fulfilled({ todolistId: todolistId1 }, "requestId", todolistId1),
  );

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});

test("correct todolist should be added", () => {
  const title = "New todolist";
  const todolist = { id: "todolistId3", title, addedDate: "", order: 0 };
  const endState = todolistsReducer(startState, createTodolist.fulfilled({ todolist }, "requestId", { title }));

  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe(newTodolistTitle);
  expect(endState[2].filter).toBe("All");
});

test("correct todolist should change its title", () => {
  const title = "New title";
  const endState = todolistsReducer(
    startState,
    changeTodolistTitle.fulfilled({ id: todolistId2, title }, "requestId", { id: todolistId2, title }),
  );

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(newTodolistTitle);
});

test("correct filter of todolist should be changed", () => {
  const endState = todolistsReducer(startState, changeTodolistFilterAC({ filter: newFilter, todolistId: todolistId2 }));

  expect(endState[0].filter).toBe("All");
  expect(endState[1].filter).toBe(newFilter);
});
