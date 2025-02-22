import React from "react";
import { Box, Checkbox, IconButton, ListItem } from "@mui/material";
import { EditableSpan } from "src/common/components";
import { Delete } from "@mui/icons-material";
import { getListItemSx } from "./TaskItem.styles";
import {
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  taskPropsType,
} from "src/features/todolists/model/tasks-reducer";
import { useAppDispatch } from "src/common/hooks/useAppDispatch";

type taskType = {
  task: taskPropsType;
  todolistId: string;
};

export const TaskItem = React.memo(({ task, todolistId }: taskType) => {
  const dispatch = useAppDispatch();

  const onClick = React.useCallback(() => {
    dispatch(removeTaskAC({ taskId: task.id, todolistId: todolistId }));
  }, [dispatch, task.id, todolistId]);

  const onChangeStatus = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(
        changeTaskStatusAC({
          taskId: task.id,
          isDone: e.currentTarget.checked,
          todolistId: todolistId,
        })
      );
    },
    [dispatch, task.id, todolistId]
  );

  const onChangeTitle = React.useCallback(
    (newValueTitle: string) => {
      dispatch(
        changeTaskTitleAC({
          taskId: task.id,
          title: newValueTitle,
          todolistId: todolistId,
        })
      );
    },
    [dispatch, task.id, todolistId]
  );

  return (
    <ListItem sx={getListItemSx(task.isDone)}>
      <Box>
        <Checkbox onChange={onChangeStatus} checked={task.isDone} />
        <EditableSpan title={task.title} onchange={onChangeTitle} />
      </Box>
      <IconButton aria-label="delete" color="secondary" onClick={onClick}>
        <Delete />
      </IconButton>
    </ListItem>
  );
});
