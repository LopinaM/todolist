import { v1 } from "uuid";
import { TaskStateType } from "../App";
import {
  AddTodolistActionType,
  RemoveTodolistActionType,
} from "./todolists-reducer";

type RemoveTaskActionType = {
  type: "REMOVE-TASK";
  payload: { taskId: string; todolistId: string };
};
type AddTaskActionType = {
  type: "ADD-TASK";
  payload: { title: string; todolistId: string };
};
type ChangeTaskTitleActionType = {
  type: "CHANGE-TASK-TITLE";
  payload: { taskId: string; title: string; todolistId: string };
};
type ChangeTaskStatusActionType = {
  type: "CHANGE-TASK-STATUS";
  payload: { taskId: string; isDone: boolean; todolistId: string };
};

type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskTitleActionType
  | ChangeTaskStatusActionType
  | AddTodolistActionType
  | RemoveTodolistActionType;

const initialState: TaskStateType = {};

export const tasksReducer = (
  state: TaskStateType = initialState,
  action: ActionsType
): TaskStateType => {
  switch (action.type) {
    case "REMOVE-TASK": {
      const stateCopy = { ...state };
      const tasks = state[action.payload.todolistId];
      const filteredTasks = tasks.filter((t) => t.id !== action.payload.taskId);
      stateCopy[action.payload.todolistId] = filteredTasks;

      return stateCopy;
    }

    case "ADD-TASK":
      const stateCopy = { ...state };
      const tasks = state[action.payload.todolistId];

      let newTask = { id: v1(), title: action.payload.title, isDone: false };
      let newTasks = [newTask, ...tasks];

      stateCopy[action.payload.todolistId] = newTasks;

      return stateCopy;

    case "CHANGE-TASK-TITLE": {
      let todolistTasks = state[action.payload.todolistId];
      state[action.payload.todolistId] = todolistTasks.map((t) =>
        t.id === action.payload.taskId
          ? { ...t, title: action.payload.title }
          : t
      );

      return { ...state };
    }

    case "CHANGE-TASK-STATUS": {
      let todolistTasks = state[action.payload.todolistId];
      state[action.payload.todolistId] = todolistTasks.map((t) =>
        t.id === action.payload.taskId
          ? { ...t, isDone: action.payload.isDone }
          : t
      );

      return { ...state };
    }

    case "ADD-TODOLIST": {
      return { ...state, [action.payload.todolistId]: [] };
    }

    case "REMOVE-TODOLIST": {
      const stateCopy = { ...state };

      delete stateCopy[action.payload.todolistId];

      return stateCopy;
    }

    default:
      return state;
  }
};

export const removeTaskAC = (
  taskId: string,
  todolistId: string
): RemoveTaskActionType => {
  return {
    type: "REMOVE-TASK",
    payload: { taskId: taskId, todolistId: todolistId },
  };
};

export const addTaskAC = (
  title: string,
  todolistId: string
): AddTaskActionType => {
  return {
    type: "ADD-TASK",
    payload: { title: title, todolistId: todolistId },
  };
};

export const changeTaskTitleAC = (
  taskId: string,
  title: string,
  todolistId: string
): ChangeTaskTitleActionType => {
  return {
    type: "CHANGE-TASK-TITLE",
    payload: { taskId: taskId, title: title, todolistId: todolistId },
  };
};

export const changeTaskStatusAC = (
  taskId: string,
  isDone: boolean,
  todolistId: string
): ChangeTaskStatusActionType => {
  return {
    type: "CHANGE-TASK-STATUS",
    payload: { taskId: taskId, isDone: isDone, todolistId: todolistId },
  };
};
