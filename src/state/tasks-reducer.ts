import { v1 } from "uuid";
import { TaskStateType } from "../App";
import {
  AddTodolistActionType,
  RemoveTodolistActionType,
} from "./todolists-reducer";

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
    // case "REMOVE-TASK": {
    //   const stateCopy = { ...state };
    //   const tasks = state[action.payload.todolistId];
    //   const filteredTasks = tasks.filter((t) => t.id !== action.payload.taskId);
    //   stateCopy[action.payload.todolistId] = filteredTasks;

    //   return stateCopy;
    // }
    case "REMOVE-TASK": {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter(
          (t) => t.id !== action.payload.taskId
        ),
      };
    }

    // case "ADD-TASK":
    //   const stateCopy = { ...state };
    //   const tasks = state[action.payload.todolistId];

    //   let newTask = { id: v1(), title: action.payload.title, isDone: false };
    //   let newTasks = [newTask, ...tasks];

    //   stateCopy[action.payload.todolistId] = newTasks;

    //   return stateCopy;

    case "ADD-TASK":
      let newTask = {
        id: action.payload.taskId,
        title: action.payload.title,
        isDone: false,
      };

      return {
        ...state,
        [action.payload.todolistId]: [
          newTask,
          ...state[action.payload.todolistId],
        ],
      };

    // case "CHANGE-TASK-TITLE": {
    //   let todolistTasks = state[action.payload.todolistId];
    //   state[action.payload.todolistId] = todolistTasks.map((t) =>
    //     t.id === action.payload.taskId
    //       ? { ...t, title: action.payload.title }
    //       : t
    //   );

    //   return { ...state };
    // }

    case "CHANGE-TASK-TITLE": {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map((t) =>
          t.id === action.payload.taskId
            ? { ...t, title: action.payload.title }
            : t
        ),
      };
    }

    // case "CHANGE-TASK-STATUS": {
    //   let todolistTasks = state[action.payload.todolistId];
    //   state[action.payload.todolistId] = todolistTasks.map((t) =>
    //     t.id === action.payload.taskId
    //       ? { ...t, isDone: action.payload.isDone }
    //       : t
    //   );

    //   return { ...state };
    // }

    case "CHANGE-TASK-STATUS": {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map((t) =>
          t.id === action.payload.taskId
            ? { ...t, isDone: action.payload.isDone }
            : t
        ),
      };
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

export const removeTaskAC = (taskId: string, todolistId: string) => {
  return {
    type: "REMOVE-TASK",
    payload: { taskId: taskId, todolistId: todolistId },
  } as const;
};

export const addTaskAC = (title: string, todolistId: string) => {
  return {
    type: "ADD-TASK",
    payload: { title: title, todolistId: todolistId, taskId: v1() },
  } as const;
};

export const changeTaskTitleAC = (payload: {
  taskId: string;
  title: string;
  todolistId: string;
}) => ({ type: "CHANGE-TASK-TITLE", payload } as const);

export const changeTaskStatusAC = (payload: {
  taskId: string;
  isDone: boolean;
  todolistId: string;
}) => ({ type: "CHANGE-TASK-STATUS", payload } as const);

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;
export type AddTaskActionType = ReturnType<typeof addTaskAC>;
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>;
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>;
