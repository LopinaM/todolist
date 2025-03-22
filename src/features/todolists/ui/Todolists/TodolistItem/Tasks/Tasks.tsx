import React, { useEffect } from "react";
import List from "@mui/material/List";
import { TaskItem } from "./TaskItem/TaskItem";
import { useAppSelector } from "../../../../../../common/hooks/useAppSelector";
import { TodolistType } from "src/features/todolists/model/todolists-slice";
import { fetchTasksTC, selectTasks } from "src/features/todolists/model/tasks-slice";
import { useAppDispatch } from "src/common/hooks";
import { TaskStatus } from "src/common/enums";

type propsType = {
  todolist: TodolistType;
};
export const Tasks = React.memo(({ todolist }: propsType) => {
  const tasks = useAppSelector(selectTasks);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTasksTC(todolist.id));
  }, []);

  const taskForTodolist = tasks[todolist.id];
  let filteredTasks = taskForTodolist;

  if (todolist.filter === "Completed") {
    filteredTasks = taskForTodolist.filter((t) => t.status === TaskStatus.Completed);
  }
  if (todolist.filter === "Active") {
    filteredTasks = taskForTodolist.filter((t) => t.status === TaskStatus.New);
  }

  return (
    <>
      {filteredTasks?.length === 0 ? (
        <p>empty</p>
      ) : (
        <List>{filteredTasks?.map((task) => <TaskItem key={task.id} todolistId={todolist.id} task={task} />)}</List>
      )}
    </>
  );
});
