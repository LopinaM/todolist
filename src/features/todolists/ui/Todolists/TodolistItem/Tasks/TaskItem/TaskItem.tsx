import React from "react";
import { Box, Checkbox, IconButton, ListItem } from "@mui/material";
import { EditableSpan } from "src/common/components";
import { Delete } from "@mui/icons-material";
import { getListItemSx } from "./TaskItem.styles";
import { deleteTask, updateTask } from "src/features/todolists/model/tasks-slice";
import { useAppDispatch } from "src/common/hooks/useAppDispatch";
import { Task } from "src/features/todolists/api/tasksApi.types";
import { TaskStatus } from "src/common/enums";
import { TodolistType } from "src/features/todolists/model/todolists-slice";

type taskType = {
  task: Task;
  // todolistId: string;
  todolist: TodolistType;
};

export const TaskItem = React.memo(({ task, todolist }: taskType) => {
  const [deleteTaskStatus, setStateDeleteTaskStatus] = React.useState(false);
  const dispatch = useAppDispatch();

  const onDelete = React.useCallback(() => {
    setStateDeleteTaskStatus(true);
    dispatch(deleteTask({ taskId: task.id, todolistId: todolist.id }));
  }, [dispatch, task.id, todolist.id]);

  const onChangeStatus = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New;
      const newTask = { ...task, status };

      dispatch(updateTask(newTask));
    },
    [dispatch, task.id, todolist.id],
  );

  const onChangeTitle = React.useCallback(
    (newValueTitle: string) => {
      const newTask = { ...task, title: newValueTitle };

      dispatch(updateTask(newTask));
    },
    [dispatch, task.id, todolist.id],
  );

  const isTaskCompleted = task.status === TaskStatus.Completed;
  const disabled = todolist.entityStatus === "loading";

  return (
    <ListItem sx={getListItemSx(isTaskCompleted)}>
      <Box>
        <Checkbox onChange={onChangeStatus} checked={isTaskCompleted} disabled={disabled} />
        <EditableSpan
          title={task.title}
          onchange={onChangeTitle}
          disabled={disabled || task.status === TaskStatus.Completed || deleteTaskStatus}
        />
      </Box>
      <IconButton aria-label="delete" color="secondary" onClick={onDelete} disabled={disabled}>
        <Delete />
      </IconButton>
    </ListItem>
  );
});
