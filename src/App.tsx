import React from "react";
import "./App.css";
import { taskPropsType, Todolist } from "./Todolist";
import { AddItemForm } from "./AddItemForm";
import {
  AppBar,
  Button,
  Container,
  CssBaseline,
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
} from "./model/todolists-reducer";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
} from "./model/tasks-reducer";
import { ThemeProvider } from "@mui/material";
import { changeThemeModeAC } from "./app/app-reducer";
import { useAppSelector } from "./common/hooks/useAppSelector";
import { selectTodolists } from "./model/todolists-selectors";
import { selectTasks } from "./model/tasks-selectors";
import { useAppDispatch } from "./common/hooks/useAppDispatch";
import { selectThemeMode } from "./app/app-selectors";
import { getTheme } from "./common/theme/theme";

export type FilterValuesType = "All" | "Completed" | "Active";

export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type TaskStateType = {
  [key: string]: Array<taskPropsType>;
};

const App = () => {
  const todolists = useAppSelector(selectTodolists);
  const tasksObj = useAppSelector(selectTasks);
  const themeMode = useAppSelector(selectThemeMode);
  const theme = getTheme(themeMode);

  const dispatch = useAppDispatch();

  const removeTask = React.useCallback(
    (taskId: string, todolistId: string) => {
      dispatch(removeTaskAC({ taskId, todolistId }));
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
    (taskId: string, newValueTitle: string, todolistId: string) => {
      dispatch(changeTaskTitleAC({ taskId, title: newValueTitle, todolistId }));
    },
    [dispatch]
  );

  const ChangeStatus = React.useCallback(
    (taskId: string, isDone: boolean, todolistId: string) => {
      dispatch(changeTaskStatusAC({ taskId, isDone, todolistId }));
    },
    [dispatch]
  );

  const removeTodolist = React.useCallback(
    (todolistId: string) => {
      dispatch(removeTodolistAC({ todolistId }));
    },
    [dispatch]
  );

  const ChangeFilter = React.useCallback(
    (filter: FilterValuesType, todolistId: string) => {
      dispatch(changeTodolistFilterAC({ filter, todolistId }));
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
      dispatch(changeTodolistTitleAC({ todolistId, title: newValueTitle }));
    },
    [dispatch]
  );

  const onChangeThemeMode = () => {
    dispatch(
      changeThemeModeAC({ themeMode: themeMode === "light" ? "dark" : "light" })
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
            <Button variant="outlined" color="inherit">
              Logout
            </Button>
            <Button variant="outlined" color="inherit">
              Faq
            </Button>
          </div>
          <Switch onChange={onChangeThemeMode} />
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid2 container style={{ padding: "20px 0px" }}>
          <AddItemForm addItem={addTodolist} />
        </Grid2>
        <Grid2 container spacing={4}>
          {todolists.map((td) => {
            return (
              <Grid2 key={td.id}>
                <Paper elevation={3} style={{ padding: "10px" }}>
                  <Todolist
                    id={td.id}
                    title={td.title}
                    task={tasksObj[td.id]}
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
    </ThemeProvider>
  );
};

export default App;
