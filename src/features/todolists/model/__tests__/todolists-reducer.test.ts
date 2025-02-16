import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  FilterValuesType,
  removeTodolistAC,
  todolistsReducer,
  TodolistType,
} from "../todolists-reducer";
import { nanoid } from "@reduxjs/toolkit";

let todolistId1 = nanoid();
let todolistId2 = nanoid();

let newTodolistTitle = "New Todolist";
let newFilter: FilterValuesType = "Completed";

let startState: Array<TodolistType> = [];

beforeEach(() => {
  startState = [
    { id: todolistId1, title: "What to learn", filter: "All" },
    { id: todolistId2, title: "What to bay", filter: "All" },
  ];
});

test("correct todolist should be removed", () => {
  const endState = todolistsReducer(
    startState,
    removeTodolistAC({ todolistId: todolistId1 })
  );

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});

test("correct todolist should be added", () => {
  const endState = todolistsReducer(
    startState,
    addTodolistAC(newTodolistTitle)
  );

  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe(newTodolistTitle);
  expect(endState[2].filter).toBe("All");
});

test("correct todolist should change its name", () => {
  const endState = todolistsReducer(
    startState,
    changeTodolistTitleAC({ todolistId: todolistId2, title: newTodolistTitle })
  );

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(newTodolistTitle);
});

test("correct filter of todolist should be changed", () => {
  const endState = todolistsReducer(
    startState,
    changeTodolistFilterAC({ filter: newFilter, todolistId: todolistId2 })
  );

  expect(endState[0].filter).toBe("All");
  expect(endState[1].filter).toBe(newFilter);
});
