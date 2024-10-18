import React from "react";
import "./App.css";
import { taskPropsType, Todolist } from "./Todolist";
import { v1 } from "uuid";

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
    { id: todolistId2, title: "What to bay", filter: "Completed" },
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

  return (
    <div className="App">
      {todolists.map((td) => {
        let taskForTodolist = tasksObj[td.id];

        if (td.filter === "Completed") {
          taskForTodolist = taskForTodolist.filter((t) => t.isDone === true);
        }
        if (td.filter === "Active") {
          taskForTodolist = taskForTodolist.filter((t) => t.isDone === false);
        }

        return (
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
          />
        );
      })}
    </div>
  );
}

export default App;
