import React from "react";
import { FilterValuesType } from "./App";

export type taskPropsType = {
  id: string;
  title: string;
  isDone: boolean;
};

type todolistPropsType = {
  id: string;
  title?: string;
  task: Array<taskPropsType>;
  checked?: boolean;
  addTask: (title: string, todolistId: string) => void;
  removeTask: (id: string, todolistId: string) => void;
  ChangeFilter: (value: FilterValuesType, todolistId: string) => void;
  ChangeStatus: (taskid: string, isDone: boolean, todolistId: string) => void;
  filter: FilterValuesType;
  removeTodolist: (todolistId: string) => void;
};

export const Todolist = (props: todolistPropsType) => {
  const [newTaskTitle, setNewTaskTitle] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  const onNewTaskTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === "Enter") {
      addTask();
    }
  };

  const addTask = () => {
    if (newTaskTitle.trim() !== "") {
      props.addTask(newTaskTitle.trim(), props.id);
      setNewTaskTitle("");
    } else {
      setError("Field is required");
      // setNewTaskTitle("");
    }
  };

  const onAllClick = () => props.ChangeFilter("All", props.id);
  const onActiveClick = () => props.ChangeFilter("Active", props.id);
  const onCompletedClick = () => props.ChangeFilter("Completed", props.id);

  const removeTodolist = () => {
    props.removeTodolist(props.id);
  };

  return (
    <div>
      <h3>
        {props.title} <button onClick={removeTodolist}>x</button>
      </h3>
      <div>
        <input
          value={newTaskTitle}
          onChange={onNewTaskTitleChange}
          onKeyDown={onKeyDown}
          className={error ? "error" : ""}
        />
        <button onClick={addTask}>+</button>
        {error && <div className="error-message">{error}</div>}
      </div>
      <ul>
        {props.task.map((t) => {
          const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            props.ChangeStatus(t.id, e.currentTarget.checked, props.id);
          };
          const onClick = () => {
            props.removeTask(t.id, props.id);
          };
          return (
            <li key={t.id} className={t.isDone ? "is-done" : ""}>
              <input type="checkbox" checked={t.isDone} onChange={onChange} />
              <span>{t.title}</span>
              <button onClick={onClick}>x</button>
            </li>
          );
        })}
      </ul>
      <div>
        <button
          className={props.filter === "All" ? "active-filter" : ""}
          onClick={onAllClick}
        >
          All
        </button>
        <button
          className={props.filter === "Active" ? "active-filter" : ""}
          onClick={onActiveClick}
        >
          Active
        </button>
        <button
          className={props.filter === "Completed" ? "active-filter" : ""}
          onClick={onCompletedClick}
        >
          Completed
        </button>
      </div>
    </div>
  );
};
