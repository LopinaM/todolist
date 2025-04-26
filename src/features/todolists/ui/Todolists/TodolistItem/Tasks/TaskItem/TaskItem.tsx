import React from "react";
import { Box, Checkbox, IconButton, ListItem } from "@mui/material";
import { EditableSpan } from "src/common/components";
import { Delete } from "@mui/icons-material";
import { getListItemSx } from "./TaskItem.styles";
import { Task, UpdateTaskModel } from "src/features/todolists/api/tasksApi.types";
import { TaskStatus } from "src/common/enums";
import { TodolistType } from "src/features/todolists/model/todolists-slice";
import { useDeleteTaskMutation, useUpdateTaskMutation } from "src/features/todolists/api/tasksApi";

type taskType = {
  task: Task;
  todolist: TodolistType;
};

export const TaskItem = React.memo(({ task, todolist }: taskType) => {
  const [deleteTaskStatus, setStateDeleteTaskStatus] = React.useState(false);

  const [deleteTask] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  const onDelete = () => {
    setStateDeleteTaskStatus(true);
    deleteTask({ taskId: task.id, todolistId: todolist.id });
  };

  const onChangeStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New;
    const model: UpdateTaskModel = { ...task, status };

    updateTask({ taskId: task.id, todolistId: todolist.id, model });
  };

  const onChangeTitle = (newValueTitle: string) => {
    const model: UpdateTaskModel = { ...task, title: newValueTitle };

    updateTask({ taskId: task.id, todolistId: todolist.id, model });
  };

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
