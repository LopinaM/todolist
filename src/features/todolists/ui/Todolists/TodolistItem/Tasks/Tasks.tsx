import React, { useState } from "react";
import List from "@mui/material/List";
import { TaskItem } from "./TaskItem/TaskItem";
import { TaskStatus } from "src/common/enums";
import { useGetTasksQuery } from "src/features/todolists/api/tasksApi";
import { TasksSkeleton } from "./TasksSkeleton/TasksSkeleton";
import { TodolistType } from "src/features/todolists/lib/types/types";
import { TasksPagination } from "./TasksPagination/TasksPagination";
import { PAGE_SIZE } from "src/common/constants";

type TasksProps = {
  todolist: TodolistType;
};

export const Tasks = React.memo(({ todolist }: TasksProps) => {
  const [page, setPage] = useState(1);

  const { data: tasks, isLoading } = useGetTasksQuery({ todolistId: todolist.id, params: { page } });

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
        <div style={{ display: "flex", justifyContent: "center" }}>empty</div>
      ) : (
        <>
          <List>{filteredTasks?.map((task) => <TaskItem key={task.id} todolist={todolist} task={task} />)}</List>
          {tasks?.totalCount && tasks?.totalCount > PAGE_SIZE && (
            <TasksPagination totalCount={tasks?.totalCount || 0} page={page} setPage={setPage} />
          )}
        </>
      )}
    </>
  );
});
