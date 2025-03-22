import { tasksReducer, TaskStateType } from "../tasks-slice";
import { createTodolist, todolistsReducer, TodolistType } from "../todolists-slice";

test("ids should be equals", () => {
  const startTasksState: TaskStateType = {};
  const startTodolistsState: TodolistType[] = [];

  const title = "New todolist";
  const todolist = { id: "todolistId3", title, addedDate: "", order: 0 };
  const action = createTodolist.fulfilled({ todolist }, "requestId", { title });

  const endTasksState = tasksReducer(startTasksState, action);
  const endTodolistsState = todolistsReducer(startTodolistsState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.payload.todolist);
  expect(idFromTodolists).toBe(action.payload.todolist);
});
