import React from "react";
import { taskPropsType } from "./Todolist";
import { Box, Checkbox, IconButton, ListItem } from "@mui/material";
import { EditableSpan } from "./EditableSpan";
import { Delete } from "@mui/icons-material";
import { getListItemSx } from "./Todolist.styles";

type taskType = {
  removeTask: (id: string, todolistId: string) => void;
  ChangeStatus: (taskid: string, isDone: boolean, todolistId: string) => void;
  ChangeTaskTitle: (
    id: string,
    todolistId: string,
    newValueTitle: string
  ) => void;
  task: taskPropsType;
  todolistId: string;
};

export const Task = React.memo((props: taskType) => {
  const onChangeStatus = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      props.ChangeStatus(
        props.task.id,
        e.currentTarget.checked,
        props.todolistId
      );
    },
    []
  );

  const onClick = () => {
    props.removeTask(props.task.id, props.todolistId);
  };

  const onChangeTitle = React.useCallback((newValueTitle: string) => {
    props.ChangeTaskTitle(props.task.id, newValueTitle, props.todolistId);
  }, []);
  return (
    <ListItem key={props.task.id} sx={getListItemSx(props.task.isDone)}>
      <Box>
        <Checkbox onChange={onChangeStatus} checked={props.task.isDone} />
        <EditableSpan title={props.task.title} onchange={onChangeTitle} />
      </Box>
      <IconButton aria-label="delete" color="secondary" onClick={onClick}>
        <Delete />
      </IconButton>
    </ListItem>
  );
});
