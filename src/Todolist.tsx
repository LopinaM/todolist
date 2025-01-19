import React, { useCallback } from "react";
import { FilterValuesType } from "./App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import { Box, Button, Checkbox, IconButton, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { filterButtonsContainerSx, getListItemSx } from "./Todolist.styles";
import { Task } from "./Task";

export type taskPropsType = {
  id: string;
  title: string;
  isDone: boolean;
};

type todolistPropsType = {
  id: string;
  title: string;
  task: Array<taskPropsType>;
  checked?: boolean;
  addTask: (title: string, todolistId: string) => void;
  ChangeFilter: (value: FilterValuesType, todolistId: string) => void;
  filter: FilterValuesType;
  removeTodolist: (todolistId: string) => void;
  onChangeTodolistTitle: (newValueTitle: string, todolistId: string) => void;

  removeTask: (id: string, todolistId: string) => void;
  ChangeStatus: (taskid: string, isDone: boolean, todolistId: string) => void;
  ChangeTaskTitle: (
    id: string,
    todolistId: string,
    newValueTitle: string
  ) => void;
};

export const Todolist = React.memo((props: todolistPropsType) => {
  const addTask = useCallback(
    (title: string) => {
      props.addTask(title, props.id);
    },
    [props.addTask, props.id]
  );

  let taskForTodolist = props.task;

  if (props.filter === "Completed") {
    taskForTodolist = props.task.filter((t) => t.isDone === true);
  }
  if (props.filter === "Active") {
    taskForTodolist = props.task.filter((t) => t.isDone === false);
  }

  const onAllClick = React.useCallback(
    () => props.ChangeFilter("All", props.id),
    [props.ChangeFilter, props.id]
  );
  const onActiveClick = React.useCallback(
    () => props.ChangeFilter("Active", props.id),
    [props.ChangeFilter, props.id]
  );
  const onCompletedClick = React.useCallback(
    () => props.ChangeFilter("Completed", props.id),
    [props.ChangeFilter, props.id]
  );

  const removeTodolist = () => {
    props.removeTodolist(props.id);
  };

  const onChangeTodolistTitle = React.useCallback(
    (newValueTitle: string) => {
      props.onChangeTodolistTitle(props.id, newValueTitle);
    },
    [props.id, props.onChangeTodolistTitle]
  );

  return (
    <div>
      {/* <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3>
          <EditableSpan title={props.title} onchange={onChangeTodolistTitle} />
        </h3>
        <IconButton aria-label="delete" onClick={removeTodolist}>
          <Delete />
        </IconButton>
      </div> */}

      <Typography align="center" variant="h6">
        <EditableSpan title={props.title} onchange={onChangeTodolistTitle} />
        <IconButton aria-label="delete" onClick={removeTodolist}>
          <Delete />
        </IconButton>
      </Typography>

      <AddItemForm addItem={addTask} />
      <List>
        {taskForTodolist.map((t) => (
          <Task
            key={t.id}
            todolistId={props.id}
            task={t}
            removeTask={props.removeTask}
            ChangeStatus={props.ChangeStatus}
            ChangeTaskTitle={props.ChangeTaskTitle}
          />
        ))}
      </List>
      <Box sx={filterButtonsContainerSx}>
        <Button
          variant={props.filter === "All" ? "contained" : "text"}
          onClick={onAllClick}
        >
          All
        </Button>
        <Button
          color="primary"
          variant={props.filter === "Active" ? "contained" : "text"}
          onClick={onActiveClick}
        >
          Active
        </Button>
        <Button
          color="secondary"
          variant={props.filter === "Completed" ? "contained" : "text"}
          onClick={onCompletedClick}
        >
          Completed
        </Button>
      </Box>
    </div>
  );
});
