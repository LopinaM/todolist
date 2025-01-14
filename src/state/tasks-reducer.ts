import { v1 } from "uuid";
import { TaskStateType } from "../App";
import {
  AddTodolistActionType,
  RemoveTodolistActionType,
} from "./todolists-reducer";

type RemoveTaskActionType = {
  type: "REMOVE-TASK";
  taskId: string;
  todolistId: string;
};
type AddTaskActionType = {
  type: "ADD-TASK";
  title: string;
  todolistId: string;
};
type ChangeTaskTitleActionType = {
  type: "CHANGE-TASK-TITLE";
  taskId: string;
  title: string;
  todolistId: string;
};
type ChangeTaskStatusActionType = {
  type: "CHANGE-TASK-STATUS";
  taskId: string;
  isDone: boolean;
  todolistId: string;
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
      const tasks = state[action.todolistId];
      const filteredTasks = tasks.filter((t) => t.id !== action.taskId);
      stateCopy[action.todolistId] = filteredTasks;

      return stateCopy;
    }

    case "ADD-TASK":
      const stateCopy = { ...state };
      const tasks = state[action.todolistId];

      let newTask = { id: v1(), title: action.title, isDone: false };
      let newTasks = [newTask, ...tasks];

      stateCopy[action.todolistId] = newTasks;

      return stateCopy;

    case "CHANGE-TASK-TITLE": {
      const stateCopy = { ...state };
      const tasks = state[action.todolistId];
      const task = tasks.find((t) => t.id === action.taskId);
      if (task) {
        task.title = action.title;

        return stateCopy;
      }

      return stateCopy;
    }

    case "CHANGE-TASK-STATUS": {
      const stateCopy = { ...state };
      const tasks = state[action.todolistId];
      const task = tasks.find((t) => t.id === action.taskId);
      if (task) {
        task.isDone = action.isDone;

        return stateCopy;
      }

      return stateCopy;
    }

    // case "ADD-TODOLIST": {
    //   const stateCopy = { ...state };

    //   stateCopy[v1()] = [];

    //   return stateCopy;
    // }

    case "ADD-TODOLIST": {
      return { ...state, [action.payload.todolistId]: [] };
    }

    case "REMOVE-TODOLIST": {
      const stateCopy = { ...state };

      delete stateCopy[action.id];

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
  return { type: "REMOVE-TASK", taskId: taskId, todolistId: todolistId };
};

export const addTaskAC = (
  title: string,
  todolistId: string
): AddTaskActionType => {
  return { type: "ADD-TASK", title: title, todolistId: todolistId };
};

export const changeTaskTitleAC = (
  taskId: string,
  title: string,
  todolistId: string
): ChangeTaskTitleActionType => {
  return {
    type: "CHANGE-TASK-TITLE",
    taskId: taskId,
    title: title,
    todolistId: todolistId,
  };
};

export const changeTaskStatusAC = (
  taskId: string,
  isDone: boolean,
  todolistId: string
): ChangeTaskStatusActionType => {
  return {
    type: "CHANGE-TASK-STATUS",
    taskId: taskId,
    isDone: isDone,
    todolistId: todolistId,
  };
};
