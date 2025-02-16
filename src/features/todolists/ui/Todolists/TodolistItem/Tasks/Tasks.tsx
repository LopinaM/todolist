import React from "react";
import List from "@mui/material/List";
import { TaskItem } from "./TaskItem/TaskItem";
import { useAppSelector } from "../../../../../../common/hooks/useAppSelector";
import { selectTasks } from "src/features/todolists/model/tasks-selectors";
import { TodolistType } from "src/features/todolists/model/todolists-reducer";

type propsType = {
  todolist: TodolistType;
};
export const Tasks = React.memo(({ todolist }: propsType) => {
  const tasks = useAppSelector(selectTasks);

  const taskForTodolist = tasks[todolist.id];
  let filteredTasks = taskForTodolist;

  if (todolist.filter === "Completed") {
    filteredTasks = taskForTodolist.filter((t) => t.isDone === true);
  }
  if (todolist.filter === "Active") {
    filteredTasks = taskForTodolist.filter((t) => t.isDone === false);
  }

  return (
    <>
      {filteredTasks.length === 0 ? (
        <p>empty</p>
      ) : (
        <List>
          {filteredTasks.map((task) => (
            <TaskItem key={task.id} todolistId={todolist.id} task={task} />
          ))}
        </List>
      )}
    </>
  );
});
