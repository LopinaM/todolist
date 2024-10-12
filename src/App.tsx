import React from "react";
import "./App.css";
import { Todolist } from "./Todolost";

const todolistObj = [
  { id: 1, title: "What to learn", isDone: true },
  { id: 2, title: "Movies", isDone: true },
  { id: 3, title: "Songs", isDone: false },
];

const task1 = [
  { id: 1, title: "CSS", isDone: true },
  { id: 2, title: "React", isDone: true },
  { id: 3, title: "JS", isDone: false },
];

const task2 = [
  { id: 1, title: "Terminator", isDone: true },
  { id: 2, title: "Star of wars", isDone: true },
  { id: 3, title: "Bi2", isDone: true },
];

function App() {
  return (
    <div className="App">
      {/* {todolistObj.map((item, index) => (
        <Todolist title={item.title} />
      ))} */}
      <Todolist title="What to learn" task={task1} />
      <Todolist title="Movies" task={task2} />
    </div>
  );
}

export default App;
