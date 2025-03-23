import React from "react";
import { useAppDispatch } from "src/common/hooks/useAppDispatch";
import { TodolistType } from "src/features/todolists/model/todolists-slice";
import { TodolistTitle } from "./TodolistTitle/TodolistTitle";
import { AddItemForm } from "src/common/components/AddItemForm/AddItemForm";
import { Tasks } from "./Tasks/Tasks";
import { FilterButtons } from "./FilterButtons/FilterButtons";
import { createTask } from "src/features/todolists/model/tasks-slice";

type todolistPropsType = {
  todolist: TodolistType;
};

export const TodolistItem = React.memo(({ todolist }: todolistPropsType) => {
  const dispatch = useAppDispatch();

  const addTask = React.useCallback(
    (title: string) => {
      dispatch(createTask({ todolistId: todolist.id, title }));
    },
    [dispatch, todolist.id],
  );

  return (
    <>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTask} disabled={todolist.entityStatus === "loading"} />
      <Tasks todolist={todolist} />
      <FilterButtons todolist={todolist} />
    </>
  );
});
