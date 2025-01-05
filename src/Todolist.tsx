import React from "react";
import { FilterValuesType } from "./App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import { Box, Button, Checkbox, IconButton, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { filterButtonsContainerSx, getListItemSx } from "./Todolist.styles";

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
  removeTask: (id: string, todolistId: string) => void;
  ChangeFilter: (value: FilterValuesType, todolistId: string) => void;
  ChangeStatus: (taskid: string, isDone: boolean, todolistId: string) => void;
  filter: FilterValuesType;
  removeTodolist: (todolistId: string) => void;
  ChangeTaskTitle: (
    id: string,
    todolistId: string,
    newValueTitle: string
  ) => void;
  onChangeTodolistTitle: (newValueTitle: string, todolistId: string) => void;
};

export const Todolist = (props: todolistPropsType) => {
  const addTask = (title: string) => {
    props.addTask(title, props.id);
  };

  const onAllClick = () => props.ChangeFilter("All", props.id);
  const onActiveClick = () => props.ChangeFilter("Active", props.id);
  const onCompletedClick = () => props.ChangeFilter("Completed", props.id);

  const removeTodolist = () => {
    props.removeTodolist(props.id);
  };

  const onChangeTodolistTitle = (newValueTitle: string) => {
    props.onChangeTodolistTitle(props.id, newValueTitle);
  };

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
        {props.task.map((t) => {
          const onChangeStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
            props.ChangeStatus(t.id, e.currentTarget.checked, props.id);
          };
          const onClick = () => {
            props.removeTask(t.id, props.id);
          };
          const onChangeTitle = (newValueTitle: string) => {
            props.ChangeTaskTitle(t.id, newValueTitle, props.id);
          };
          return (
            <ListItem key={t.id} sx={getListItemSx(t.isDone)}>
              <Box>
                <Checkbox onChange={onChangeStatus} checked={t.isDone} />
                <EditableSpan title={t.title} onchange={onChangeTitle} />
              </Box>
              <IconButton
                aria-label="delete"
                color="secondary"
                onClick={onClick}
              >
                <Delete />
              </IconButton>
            </ListItem>
          );
        })}
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
};
