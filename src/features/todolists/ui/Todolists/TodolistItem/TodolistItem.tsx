import React from "react";
import { useAppDispatch } from "src/common/hooks/useAppDispatch";
import { addTaskAC } from "src/features/todolists/model/tasks-reducer";
import { TodolistType } from "src/features/todolists/model/todolists-reducer";
import { TodolistTitle } from "./TodolistTitle/TodolistTitle";
import { AddItemForm } from "src/common/components/AddItemForm/AddItemForm";
import { Tasks } from "./Tasks/Tasks";
import { FilterButtons } from "./FilterButtons/FilterButtons";

type todolistPropsType = {
  todolist: TodolistType;
};

export const TodolistItem = React.memo(({ todolist }: todolistPropsType) => {
  const dispatch = useAppDispatch();

  const addTask = React.useCallback(
    (title: string) => {
      dispatch(addTaskAC(title, todolist.id));
    },
    [dispatch, todolist.id]
  );

  return (
    <>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTask} />
      <Tasks todolist={todolist} />
      <FilterButtons todolist={todolist} />
    </>
  );
});
