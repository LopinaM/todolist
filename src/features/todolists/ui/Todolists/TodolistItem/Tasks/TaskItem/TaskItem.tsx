import React from "react";
import { Box, Checkbox, IconButton, ListItem } from "@mui/material";
import { EditableSpan } from "src/common/components";
import { Delete } from "@mui/icons-material";
import { getListItemSx } from "./TaskItem.styles";
import { deleteTask, updateTask } from "src/features/todolists/model/tasks-slice";
import { useAppDispatch } from "src/common/hooks/useAppDispatch";
import { Task } from "src/features/todolists/api/tasksApi.types";
import { TaskStatus } from "src/common/enums";

type taskType = {
  task: Task;
  todolistId: string;
};

export const TaskItem = React.memo(({ task, todolistId }: taskType) => {
  const dispatch = useAppDispatch();

  const onClick = React.useCallback(() => {
    dispatch(deleteTask({ taskId: task.id, todolistId: todolistId }));
  }, [dispatch, task.id, todolistId]);

  const onChangeStatus = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New;
      const newTask = { ...task, status };

      dispatch(updateTask(newTask));
    },
    [dispatch, task.id, todolistId],
  );

  const onChangeTitle = React.useCallback(
    (newValueTitle: string) => {
      const newTask = { ...task, title: newValueTitle };

      dispatch(updateTask(newTask));
    },
    [dispatch, task.id, todolistId],
  );

  const isTaskCompleted = task.status === TaskStatus.Completed;

  return (
    <ListItem sx={getListItemSx(isTaskCompleted)}>
      <Box>
        <Checkbox onChange={onChangeStatus} checked={isTaskCompleted} />
        <EditableSpan title={task.title} onchange={onChangeTitle} />
      </Box>
      <IconButton aria-label="delete" color="secondary" onClick={onClick}>
        <Delete />
      </IconButton>
    </ListItem>
  );
});
