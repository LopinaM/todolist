import {
  tasksReducer,
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  TaskStateType,
} from "../tasks-reducer";
import { removeTodolistAC } from "../todolists-reducer";

let startState: TaskStateType = {};

beforeEach(() => {
  startState = {
    todolistId1: [
      { id: "1", title: "CSS", isDone: true },
      { id: "2", title: "React", isDone: true },
      { id: "3", title: "JS", isDone: false },
      { id: "4", title: "TS", isDone: true },
    ],
    todolistId2: [
      { id: "1", title: "Milk", isDone: false },
      { id: "2", title: "Book", isDone: true },
    ],
  };
});

test("correct task should be removed", () => {
  const endState = tasksReducer(startState, removeTaskAC({ taskId: "2", todolistId: "todolistId2" }));

  expect(endState["todolistId1"].length).toBe(4);
  expect(endState["todolistId2"].length).toBe(1);
  expect(endState["todolistId2"][0].id).toBe("1");
  expect(endState["todolistId2"].every((t) => t.id !== "2")).toBeTruthy();
});

test("correct task should be added", () => {
  const endState = tasksReducer(startState, addTaskAC("newTaskTitle", "todolistId2"));

  expect(endState["todolistId1"].length).toBe(4);
  expect(endState["todolistId2"].length).toBe(3);
  expect(endState["todolistId2"][0].id).toBeDefined();
  expect(endState["todolistId2"][0].title).toBe("newTaskTitle");
  expect(endState["todolistId2"][0].isDone).toBe(false);
});

test("correct task should change its name", () => {
  const endState = tasksReducer(
    startState,
    changeTaskTitleAC({
      taskId: "2",
      title: "newTaskTitle",
      todolistId: "todolistId1",
    }),
  );

  expect(endState["todolistId1"][1].title).toBe("newTaskTitle");
});

test("correct status of task should be changed", () => {
  const endState = tasksReducer(
    startState,
    changeTaskStatusAC({
      taskId: "1",
      isDone: false,
      todolistId: "todolistId1",
    }),
  );

  expect(endState["todolistId1"][0].isDone).toBe(false);
  expect(endState["todolistId2"][1].isDone).toBe(true);
});

// test("new properties with new array should be added when new todolist is added", () => {
//   const endState = tasksReducer(startState, addTodolistAC("new todolist"));

//   const keys = Object.keys(endState);
//   const newKey = keys.find((k) => k !== "todolistId1" && k !== "todolistId2");

//   if (!newKey) {
//     throw Error("new key hould be added");
//   }

//   expect(keys.length).toBe(3);
//   expect(endState[newKey]).toEqual([]);
// });

test("property with todolistId should be deleted", () => {
  const action = removeTodolistAC({ todolistId: "todolistId2" });

  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState["todolistId2"]).not.toBeDefined();
  // or
  expect(endState["todolistId2"]).toBeUndefined();
});
