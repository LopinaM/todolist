import { v1 } from "uuid";
import { FilterValuesType, TodolistType } from "../App";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todolistsReducer,
} from "./todolists-reducer";

let todolistId1 = v1();
let todolistId2 = v1();

let newTodolistTitle = "New Todolist";
let newFilter: FilterValuesType = "Completed";

const startState: Array<TodolistType> = [
  { id: todolistId1, title: "What to learn", filter: "All" },
  { id: todolistId2, title: "What to bay", filter: "All" },
];

test("correct todolist should be removed", () => {
  const endState = todolistsReducer(startState, removeTodolistAC(todolistId1));

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});

test("correct todolist should be added", () => {
  const endState = todolistsReducer(
    startState,
    addTodolistAC(newTodolistTitle)
  );

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe(newTodolistTitle);
  expect(endState[0].filter).toBe("All");
});

test("correct todolist should change its name", () => {
  const endState = todolistsReducer(
    startState,
    changeTodolistTitleAC(todolistId2, newTodolistTitle)
  );

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(newTodolistTitle);
});

test("correct filter of todolist should be changed", () => {
  const endState = todolistsReducer(
    startState,
    changeTodolistFilterAC(newFilter, todolistId2)
  );

  expect(endState[0].filter).toBe("All");
  expect(endState[1].filter).toBe(newFilter);
});
