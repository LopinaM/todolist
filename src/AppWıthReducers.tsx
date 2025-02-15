import React from "react";
import "./App.css";
import { taskPropsType, Todolist } from "./Todolist";
import { v1 } from "uuid";
import { AddItemForm } from "./AddItemForm";
import {
  AppBar,
  Container,
  Grid2,
  IconButton,
  Paper,
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
  todolistsReducer,
} from "./state/todolists-reducer";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  tasksReducer,
} from "./state/tasks-reducer";

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
  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, dispatchTodolistReducer] = React.useReducer(
    todolistsReducer,
    [
      { id: todolistId1, title: "What to learn", filter: "All" },
      { id: todolistId2, title: "What to bay", filter: "All" },
    ]
  );

  let [tasksObj, dispatchTasksReducer] = React.useReducer(tasksReducer, {
    [todolistId1]: [
      { id: v1(), title: "CSS", isDone: true },
      { id: v1(), title: "React", isDone: true },
      { id: v1(), title: "JS", isDone: false },
      { id: v1(), title: "TS", isDone: true },
    ],
    [todolistId2]: [
      { id: v1(), title: "Milk", isDone: false },
      { id: v1(), title: "Book", isDone: true },
    ],
  });

  const removeTask = (id: string, todolistId: string) => {
    const action = removeTaskAC(id, todolistId);
    dispatchTasksReducer(action);
  };

  const addTask = (title: string, todolistId: string) => {
    const action = addTaskAC(title, todolistId);
    dispatchTasksReducer(action);
  };

  const ChangeTaskTitle = (
    taskId: string,
    newValueTitle: string,
    todolistId: string
  ) => {
    dispatchTasksReducer(
      changeTaskTitleAC({
        taskId,
        title: newValueTitle,
        todolistId,
      })
    );
  };

  const ChangeStatus = (taskId: string, isDone: boolean, todolistId: string) =>
    dispatchTasksReducer(changeTaskStatusAC({ taskId, isDone, todolistId }));

  const removeTodolist = (todolistId: string) => {
    const action = removeTodolistAC(todolistId);
    dispatchTodolistReducer(action);
    dispatchTasksReducer(action);
  };

  const ChangeFilter = (filter: FilterValuesType, todolistId: string) =>
    dispatchTodolistReducer(changeTodolistFilterAC({ filter, todolistId }));

  const addTodolist = (title: string) => {
    const action = addTodolistAC(title);
    dispatchTodolistReducer(action);
    dispatchTasksReducer(action);
  };

  const onChangeTodolistTitle = (todolistId: string, newValueTitle: string) => {
    dispatchTodolistReducer(
      changeTodolistTitleAC({ todolistId, title: newValueTitle })
    );
  };

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
            <MenuButton>Login</MenuButton>
            <MenuButton>Logout</MenuButton>
            <MenuButton background={"red"}>Faq</MenuButton>
          </div>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid2 container style={{ padding: "20px 0px" }}>
          <AddItemForm addItem={addTodolist} />
        </Grid2>
        <Grid2 container spacing={5}>
          {todolists.map((td) => {
            let taskForTodolist = tasksObj[td.id];

            if (td.filter === "Completed") {
              taskForTodolist = taskForTodolist.filter(
                (t) => t.isDone === true
              );
            }
            if (td.filter === "Active") {
              taskForTodolist = taskForTodolist.filter(
                (t) => t.isDone === false
              );
            }

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
};

export default App;
