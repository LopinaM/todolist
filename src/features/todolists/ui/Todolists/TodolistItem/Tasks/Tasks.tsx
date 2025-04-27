import React from "react";
import List from "@mui/material/List";
import { TaskItem } from "./TaskItem/TaskItem";
import { TodolistType } from "src/features/todolists/model/todolists-slice";
import { TaskStatus } from "src/common/enums";
import { useGetTasksQuery } from "src/features/todolists/api/tasksApi";
import { TasksSkeleton } from "./TasksSkeleton/TasksSkeleton";
import { useAppDispatch } from "src/common/hooks";
import { setAppErrorAC } from "src/app/app-clice";

type propsType = {
  todolist: TodolistType;
};
export const Tasks = React.memo(({ todolist }: propsType) => {
  const { data: tasks, isLoading, error } = useGetTasksQuery(todolist.id);

  const dispatch = useAppDispatch();

  // if (error) {
  //   if ("status" in error) {
  //     //FetchBaseQueryError
  //     const errMsg = "error" in error ? error.error : JSON.stringify(error.data);
  //     dispatch(setAppErrorAC({ error: errMsg }));
  //   } else {
  //     //SerializedError
  //     dispatch(setAppErrorAC({ error: error.message || "Some error occurred" }));
  //   }
  // }

  const taskForTodolist = tasks?.items;
  let filteredTasks = taskForTodolist;

  if (todolist.filter === "Completed") {
    filteredTasks = taskForTodolist?.filter((t) => t.status === TaskStatus.Completed);
  }
  if (todolist.filter === "Active") {
    filteredTasks = taskForTodolist?.filter((t) => t.status === TaskStatus.New);
  }

  if (isLoading) {
    return <TasksSkeleton />;
  }

  return (
    <>
      {filteredTasks?.length === 0 ? (
        <p>empty</p>
      ) : (
        <List>{filteredTasks?.map((task) => <TaskItem key={task.id} todolist={todolist} task={task} />)}</List>
      )}
    </>
  );
});
