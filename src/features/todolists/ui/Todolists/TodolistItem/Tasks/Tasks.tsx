import React from "react";
import List from "@mui/material/List";
import { TaskItem } from "./TaskItem/TaskItem";
import { TaskStatus } from "src/common/enums";
import { useGetTasksQuery } from "src/features/todolists/api/tasksApi";
import { TasksSkeleton } from "./TasksSkeleton/TasksSkeleton";
import { TodolistType } from "src/features/todolists/lib/types/types";

type TasksProps = {
  todolist: TodolistType;
};

export const Tasks = React.memo(({ todolist }: TasksProps) => {
  const { data: tasks, isLoading } = useGetTasksQuery(todolist.id);

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
