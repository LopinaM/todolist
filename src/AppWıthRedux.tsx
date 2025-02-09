import React from "react";
import "./App.css";
import { taskPropsType, Todolist } from "./Todolist";
import { AddItemForm } from "./AddItemForm";
import {
  AppBar,
  Button,
  Container,
  Grid2,
  IconButton,
  Paper,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import { MenuButton } from "./MenuButton";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
} from "./state/todolists-reducer";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
} from "./state/tasks-reducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "./state/store";

export type FilterValuesType = "All" | "Completed" | "Active";

export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type TaskStateType = {
  [key: string]: Array<taskPropsType>;
};

function AppWithRedux() {
  const [mode, setMode] = React.useState(false);
  const dispatch = useDispatch();
  const todolists = useSelector<RootState, TodolistType[]>(
    (state) => state.todolists
  );
  const tasksObj = useSelector<RootState, TaskStateType>(
    (state) => state.tasks
  );

  const removeTask = React.useCallback(
    (id: string, todolistId: string) => {
      dispatch(removeTaskAC(id, todolistId));
    },
    [dispatch]
  );

  const addTask = React.useCallback(
    (title: string, todolistId: string) => {
      dispatch(addTaskAC(title, todolistId));
    },
    [dispatch]
  );

  const ChangeTaskTitle = React.useCallback(
    (taskid: string, newValueTitle: string, todolistId: string) => {
      dispatch(changeTaskTitleAC(taskid, newValueTitle, todolistId));
    },
    [dispatch]
  );

  const ChangeStatus = React.useCallback(
    (taskid: string, isDone: boolean, todolistId: string) => {
      dispatch(changeTaskStatusAC(taskid, isDone, todolistId));
    },
    [dispatch]
  );

  const removeTodolist = React.useCallback(
    (todolistId: string) => {
      dispatch(removeTodolistAC(todolistId));
    },
    [dispatch]
  );

  const ChangeFilter = React.useCallback(
    (value: FilterValuesType, todolistId: string) => {
      dispatch(changeTodolistFilterAC(value, todolistId));
    },
    [dispatch]
  );

  const addTodolist = React.useCallback(
    (title: string) => {
      dispatch(addTodolistAC(title));
    },
    [dispatch]
  );

  const onChangeTodolistTitle = React.useCallback(
    (todolistId: string, newValueTitle: string) => {
      dispatch(changeTodolistTitleAC(todolistId, newValueTitle));
    },
    [dispatch]
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <div>
            <Button variant="outlined" color="inherit">
              Login
            </Button>
            <MenuButton>Logout</MenuButton>
            <MenuButton background={"red"}>Faq</MenuButton>
          </div>
          <Switch
            onChange={(prev) => {
              setMode(!prev);
            }}
          />
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid2 container style={{ padding: "20px 0px" }}>
          <AddItemForm addItem={addTodolist} />
        </Grid2>
        <Grid2 container spacing={4}>
          {todolists.map((td) => {
            let taskForTodolist = tasksObj[td.id];

            // if (td.filter === "Completed") {
            //   taskForTodolist = taskForTodolist.filter(
            //     (t) => t.isDone === true
            //   );
            // }
            // if (td.filter === "Active") {
            //   taskForTodolist = taskForTodolist.filter(
            //     (t) => t.isDone === false
            //   );
            // }

            return (
              <Grid2>
                <Paper elevation={3} style={{ padding: "10px" }}>
                  <Todolist
                    key={td.id}
                    id={td.id}
                    title={td.title}
                    task={taskForTodolist}
                    addTask={addTask}
                    removeTask={removeTask}
                    ChangeFilter={ChangeFilter}
                    ChangeStatus={ChangeStatus}
                    filter={td.filter}
                    removeTodolist={removeTodolist}
                    ChangeTaskTitle={ChangeTaskTitle}
                    onChangeTodolistTitle={onChangeTodolistTitle}
                  />
                </Paper>
              </Grid2>
            );
          })}
        </Grid2>
      </Container>
    </>
  );
}

export default AppWithRedux;
