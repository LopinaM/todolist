import React from "react";
import "./App.css";
import { taskPropsType, Todolist } from "./Todolist";

export type FilterValuesType = "All" | "Completed" | "Active";

function App() {
  let initialTasks = [
    { id: 1, title: "CSS", isDone: true },
    { id: 2, title: "React", isDone: true },
    { id: 3, title: "JS", isDone: false },
    { id: 4, title: "TS", isDone: true },
  ];

  const [tasks, setTasks] = React.useState<Array<taskPropsType>>(initialTasks);
  const [filter, setFilter] = React.useState<FilterValuesType>("All");

  function removeTask(id: number) {
    let filteredTasks = tasks.filter((t) => t.id !== id);
    setTasks(filteredTasks);
  }

  function ChangeFilter(value: FilterValuesType) {
    setFilter(value);
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
        removeTask={removeTask}
        ChangeFilter={ChangeFilter}
      />
    </div>
  );
}

export default App;
