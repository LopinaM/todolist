import React from "react";
import { EditableSpan } from "../../../../../../common/components/EditableSpan/EditableSpan";
import { IconButton, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { changeTodolistTitle, deleteTodolist, TodolistType } from "src/features/todolists/model/todolists-slice";
import { useAppDispatch } from "../../../../../../common/hooks/useAppDispatch";

type propsType = {
  todolist: TodolistType;
};

export const TodolistTitle = React.memo(({ todolist }: propsType) => {
  const dispatch = useAppDispatch();

  const removeTodolist = React.useCallback(() => {
    dispatch(deleteTodolist(todolist.id));
  }, [dispatch, todolist.id]);

  const onChangeTodolistTitle = React.useCallback(
    (newValueTitle: string) => {
      dispatch(
        changeTodolistTitle({
          id: todolist.id,
          title: newValueTitle,
        }),
      );
    },
    [dispatch, todolist.id],
  );

  return (
    <>
      <Typography align="center" variant="h6">
        <EditableSpan title={todolist.title} onchange={onChangeTodolistTitle} />
        <IconButton aria-label="delete" onClick={removeTodolist}>
          <Delete />
        </IconButton>
      </Typography>
    </>
  );
});
