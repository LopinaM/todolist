import React from "react";
import { TodolistType } from "src/features/todolists/model/todolists-slice";
import { TodolistTitle } from "./TodolistTitle/TodolistTitle";
import { AddItemForm } from "src/common/components/AddItemForm/AddItemForm";
import { Tasks } from "./Tasks/Tasks";
import { FilterButtons } from "./FilterButtons/FilterButtons";
import { useCreateTaskMutation } from "src/features/todolists/api/tasksApi";

type todolistPropsType = {
  todolist: TodolistType;
};

export const TodolistItem = React.memo(({ todolist }: todolistPropsType) => {
  const [createTask] = useCreateTaskMutation();

  const addTask = (title: string) => {
    createTask({ todolistId: todolist.id, title });
  };

  return (
    <>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTask} disabled={todolist.entityStatus === "loading"} />
      <Tasks todolist={todolist} />
      <FilterButtons todolist={todolist} />
    </>
  );
});
