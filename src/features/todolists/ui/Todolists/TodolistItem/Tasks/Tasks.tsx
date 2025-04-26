import React from "react";
import List from "@mui/material/List";
import { TaskItem } from "./TaskItem/TaskItem";
import { TodolistType } from "src/features/todolists/model/todolists-slice";
import { TaskStatus } from "src/common/enums";
import { useGetTasksQuery } from "src/features/todolists/api/tasksApi";

type propsType = {
  todolist: TodolistType;
};
export const Tasks = React.memo(({ todolist }: propsType) => {
  const { data: tasks } = useGetTasksQuery(todolist.id);

  // console.log(tasks);

  const taskForTodolist = tasks?.items;
  let filteredTasks = taskForTodolist;

  if (todolist.filter === "Completed") {
    filteredTasks = taskForTodolist?.filter((t) => t.status === TaskStatus.Completed);
  }
  if (todolist.filter === "Active") {
    filteredTasks = taskForTodolist?.filter((t) => t.status === TaskStatus.New);
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
