import React from "react";
import "./App.css";
import { taskPropsType, Todolist } from "./Todolist";
import { v1 } from "uuid";
import { AddItemForm } from "./AddItemForm";
import {
  AppBar,
  Button,
  Container,
  Grid2,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import { Menu } from "@mui/icons-material";

export type FilterValuesType = "All" | "Completed" | "Active";

type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

function App() {
  function removeTask(id: string, todolistId: string) {
    let tasks = tasksObj[todolistId];
    let filteredTasks = tasks.filter((t) => t.id !== id);
    tasksObj[todolistId] = filteredTasks;

    setTasks({ ...tasksObj });
  }

  function addTask(title: string, todolistId: string) {
    let tasks = tasksObj[todolistId];

    let newTask = { id: v1(), title: title, isDone: false };
    let newTasks = [newTask, ...tasks];

    tasksObj[todolistId] = newTasks;

    setTasks({ ...tasksObj });
  }

  function ChangeStatus(taskid: string, isDone: boolean, todolistId: string) {
    let tasks = tasksObj[todolistId];
    let task = tasks.find((t) => t.id === taskid);
    if (task) {
      task.isDone = isDone;

      setTasks({ ...tasksObj });
    }
  }

  function removeTodolist(todolistId: string) {
    let filteredTodolist = todolists.filter((td) => td.id !== todolistId);
    setTodolist(filteredTodolist);

    delete tasksObj[todolistId];
    setTasks({ ...tasksObj });
  }

  function ChangeFilter(value: FilterValuesType, todolistId: string) {
    let todolist = todolists.find((td) => td.id === todolistId);
    if (todolist) {
      todolist.filter = value;
      setTodolist([...todolists]);
    }
  }

  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, setTodolist] = React.useState<Array<TodolistType>>([
    { id: todolistId1, title: "What to learn", filter: "All" },
    { id: todolistId2, title: "What to bay", filter: "All" },
  ]);

  let [tasksObj, setTasks] = React.useState({
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

  const addTodolist = (title: string) => {
    let todolist: TodolistType = {
      id: v1(),
      title: title,
      filter: "All",
    };
    setTodolist([todolist, ...todolists]);
    setTasks({ ...tasksObj, [todolist.id]: [] });
  };

  const ChangeTaskTitle = (
    taskid: string,
    newValueTitle: string,
    todolistId: string
  ) => {
    let tasks = tasksObj[todolistId];
    let task = tasks.find((t) => t.id === taskid);
    if (task) {
      task.title = newValueTitle;

      setTasks({ ...tasksObj });
    }
  };

  const onChangeTodolistTitle = (todolistId: string, newValueTitle: string) => {
    const todolist = todolists.find((td) => td.id === todolistId);
    if (todolist) {
      todolist.title = newValueTitle;
      setTodolist([...todolists]);
      // console.log(todolists);
    }
  };

  return (
    <div className="App">
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
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid2 container style={{ padding: "20px" }}>
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
    </div>
  );
}

export default App;
