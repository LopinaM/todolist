import React from "react";
import "./App.css";
import { taskPropsType, Todolist } from "./Todolist";
import { v1 } from "uuid";

export type FilterValuesType = "All" | "Completed" | "Active";

function App() {
  let initialTasks = [
    { id: v1(), title: "CSS", isDone: true },
    { id: v1(), title: "React", isDone: true },
    { id: v1(), title: "JS", isDone: false },
    { id: v1(), title: "TS", isDone: true },
  ];

  const [tasks, setTasks] = React.useState<Array<taskPropsType>>(initialTasks);
  const [filter, setFilter] = React.useState<FilterValuesType>("All");

  function removeTask(id: string) {
    let filteredTasks = tasks.filter((t) => t.id !== id);
    setTasks(filteredTasks);
  }

  function addTask(title: string) {
    let newTask = { id: v1(), title: title, isDone: false };
    let newTasks = [newTask, ...tasks];

    setTasks(newTasks);
  }

  function ChangeFilter(value: FilterValuesType) {
    setFilter(value);
  }

  function ChangeStatus(taskid: string, isDone: boolean) {
    let task = tasks.find((t) => t.id === taskid);
    if (task) {
      task.isDone = isDone;
    }
    setTasks([...tasks]);
  }

  let taskForTodolist = tasks;
  if (filter === "Completed") {
    taskForTodolist = tasks.filter((t) => t.isDone === true);
  }
  if (filter === "Active") {
    taskForTodolist = tasks.filter((t) => t.isDone === false);
  }

  return (
    <div className="App">
      <Todolist
        title="What to learn"
        task={taskForTodolist}
        addTask={addTask}
        removeTask={removeTask}
        ChangeFilter={ChangeFilter}
        ChangeStatus={ChangeStatus}
        filter={filter}
      />
    </div>
  );
}

export default App;
