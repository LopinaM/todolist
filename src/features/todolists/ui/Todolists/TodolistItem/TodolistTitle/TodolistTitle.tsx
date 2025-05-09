import React from "react";
import { EditableSpan } from "../../../../../../common/components/EditableSpan/EditableSpan";
import { IconButton, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useChangeTodolistTitleMutation, useDeleteTodolistMutation } from "src/features/todolists/api/todolistsApi";
import { TodolistType } from "src/features/todolists/lib/types/types";

type TodolistTitleProps = {
  todolist: TodolistType;
};

export const TodolistTitle = React.memo(({ todolist }: TodolistTitleProps) => {
  const { id, title, entityStatus } = todolist;

  const [deleteTodolist] = useDeleteTodolistMutation();
  const [changeTodolistTitle] = useChangeTodolistTitleMutation();

  const removeTodolist = () => {
    deleteTodolist(id);
  };

  const onChangeTodolistTitle = (title: string) => {
    changeTodolistTitle({ id: todolist.id, title });
  };

  return (
    <>
      <Typography align="center" variant="h6">
        <EditableSpan title={title} onchange={onChangeTodolistTitle} disabled={entityStatus === "loading"} />
        <IconButton aria-label="delete" onClick={removeTodolist} disabled={entityStatus === "loading"}>
          <Delete />
        </IconButton>
      </Typography>
    </>
  );
});
