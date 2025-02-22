import {
  type ChangeEvent,
  type CSSProperties,
  useEffect,
  useState,
} from "react";
import Checkbox from "@mui/material/Checkbox";
import { AddItemForm, EditableSpan } from "src/common/components";
import axios from "axios";
import type { BaseTodoResponse } from "src/common/types";

export type Todolist = {
  id: string;
  addedDate: string;
  order: number;
  title: string;
};

const token = "fa57361e-c156-410e-bfa5-ffd3358a7501";
const apiKey = "3170bb83-2f84-4a4e-a058-ac0bba401251";

export const AppHttpRequests = () => {
  const [todolists, setTodolists] = useState<Todolist[]>([]);
  const [tasks, setTasks] = useState<any>({});

  useEffect(() => {
    axios
      .get<Todolist[]>(
        "https://social-network.samuraijs.com/api/1.1/todo-lists",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => setTodolists(res.data));
  }, []);

  const createTodolist = (title: string) => {
    axios
      .post<BaseTodoResponse<{ item: Todolist }>>(
        "https://social-network.samuraijs.com/api/1.1/todo-lists",
        { title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "API-KEY": apiKey,
          },
        }
      )
      .then((res) => {
        const todolist = res.data.data.item;
        setTodolists([todolist, ...todolists]);
      });
  };

  const deleteTodolist = (id: string) => {
    axios
      .delete<BaseTodoResponse>(
        `https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "API-KEY": apiKey,
          },
        }
      )
      .then(() => {
        setTodolists(todolists.filter((todolist) => todolist.id !== id));
      });
  };

  const changeTodolistTitle = (id: string, title: string) => {
    axios
      .put<BaseTodoResponse>(
        `https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,
        { title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "API-KEY": apiKey,
          },
        }
      )
      .then(() => {
        setTodolists(
          todolists.map((todolist) =>
            todolist.id === id ? { ...todolist, title: title } : todolist
          )
        );
      });
  };

  const createTask = (todolistId: string, title: string) => {};

  const deleteTask = (todolistId: string, taskId: string) => {};

  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>, task: any) => {};

  const changeTaskTitle = (task: any, title: string) => {};

  return (
    <div style={{ margin: "20px" }}>
      <AddItemForm addItem={createTodolist} />
      {todolists.map((todolist) => (
        <div key={todolist.id} style={container}>
          <div>
            <EditableSpan
              title={todolist.title}
              onchange={(title) => changeTodolistTitle(todolist.id, title)}
            />
            <button onClick={() => deleteTodolist(todolist.id)}>x</button>
          </div>
          <AddItemForm addItem={(title) => createTask(todolist.id, title)} />
          {tasks[todolist.id]?.map((task: any) => (
            <div key={task.id}>
              <Checkbox
                checked={task.isDone}
                onChange={(e) => changeTaskStatus(e, task)}
              />
              <EditableSpan
                title={task.title}
                onchange={(title) => changeTaskTitle(task, title)}
              />
              <button onClick={() => deleteTask(todolist.id, task.id)}>
                x
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const container: CSSProperties = {
  border: "1px solid black",
  margin: "20px 0",
  padding: "10px",
  width: "300px",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
};
