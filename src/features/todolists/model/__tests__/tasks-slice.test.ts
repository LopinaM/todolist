import { TaskPriority, TaskStatus } from "src/common/enums";
import { tasksReducer, createTask, updateTask, deleteTask, TaskStateType } from "../tasks-slice";
import { deleteTodolist } from "../todolists-slice";
import { nanoid } from "@reduxjs/toolkit";

let startState: TaskStateType = {};

const taskDefaultValues = {
  description: "",
  deadline: "",
  addedDate: "",
  startDate: "",
  priority: TaskPriority.Low,
  order: 0,
};

beforeEach(() => {
  startState = {
    todolistId1: [
      {
        id: "1",
        title: "CSS",
        status: TaskStatus.New,
        todoListId: "todolistId1",
        ...taskDefaultValues,
      },
      {
        id: "2",
        title: "JS",
        status: TaskStatus.Completed,
        todoListId: "todolistId1",
        ...taskDefaultValues,
      },
      {
        id: "3",
        title: "React",
        status: TaskStatus.New,
        todoListId: "todolistId1",
        ...taskDefaultValues,
      },
    ],
    todolistId2: [
      {
        id: "1",
        title: "bread",
        status: TaskStatus.New,
        todoListId: "todolistId2",
        ...taskDefaultValues,
      },
      {
        id: "2",
        title: "milk",
        status: TaskStatus.Completed,
        todoListId: "todolistId2",
        ...taskDefaultValues,
      },
      {
        id: "3",
        title: "tea",
        status: TaskStatus.New,
        todoListId: "todolistId2",
        ...taskDefaultValues,
      },
    ],
  };
});

test("correct task should be removed", () => {
  const endState = tasksReducer(
    startState,
    deleteTask.fulfilled({ taskId: "2", todolistId: "todolistId2" }, "taskId", {
      taskId: "2",
      todolistId: "todolistId2",
    }),
  );

  expect(endState["todolistId1"].length).toBe(4);
  expect(endState["todolistId2"].length).toBe(1);
  expect(endState["todolistId2"][0].id).toBe("1");
  expect(endState["todolistId2"].every((t) => t.id !== "2")).toBeTruthy();
});

test("correct task should be created at correct array", () => {
  const task = {
    id: nanoid(),
    title: "juice",
    status: TaskStatus.New,
    description: "",
    deadline: "",
    addedDate: "",
    startDate: "",
    priority: TaskPriority.Low,
    order: 0,
    todoListId: "todolistId2",
  };
  const endState = tasksReducer(
    startState,
    createTask.fulfilled({ task }, "requestId", { todolistId: "todolistId2", title: "juice" }),
  );

  expect(endState["todolistId1"].length).toBe(4);
  expect(endState["todolistId2"].length).toBe(3);
  expect(endState["todolistId2"][0].id).toBeDefined();
  expect(endState["todolistId2"][0].title).toBe("newTaskTitle");
  expect(endState["todolistId2"][0].status).toBe(TaskStatus.New);
});

test("correct task should change its status", () => {
  const task = {
    id: "2",
    title: "milk",
    status: TaskStatus.New,
    description: "",
    deadline: "",
    addedDate: "",
    startDate: "",
    priority: TaskPriority.Low,
    order: 0,
    todoListId: "todolistId2",
  };
  const endState = tasksReducer(startState, updateTask.fulfilled({ task }, "requestId", { ...task }));

  expect(endState.todolistId2[1].status).toBe(TaskStatus.New);
  expect(endState.todolistId1[1].status).toBe(TaskStatus.Completed);
});

test("correct task should change its title", () => {
  const task = {
    id: "2",
    title: "coffee",
    status: TaskStatus.Completed,
    description: "",
    deadline: "",
    addedDate: "",
    startDate: "",
    priority: TaskPriority.Low,
    order: 0,
    todoListId: "todolistId2",
  };
  const endState = tasksReducer(startState, updateTask.fulfilled({ task }, "requestId", { ...task }));

  expect(endState.todolistId2[1].title).toBe("coffee");
  expect(endState.todolistId1[1].title).toBe("JS");
});

test("property with todolistId should be deleted", () => {
  const endState = tasksReducer(
    startState,
    deleteTodolist.fulfilled({ todolistId: "todolistId2" }, "requestId", "todolistId2"),
  );

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState["todolistId2"]).not.toBeDefined();
  // or
  expect(endState["todolistId2"]).toBeUndefined();
});
