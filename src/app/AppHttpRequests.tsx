import { type ChangeEvent, type CSSProperties, useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { AddItemForm, EditableSpan } from "src/common/components";
import { Todolist } from "src/features/todolists/api/todolistsApi.types";
import { todolistsApi } from "src/features/todolists/api/todolistsApi";
import { tasksApi } from "src/features/todolists/api/tasksApi";
import { Task, UpdateTaskModel } from "src/features/todolists/api/tasksApi.types";
import { TaskStatus } from "src/common/enums";

export const AppHttpRequests = () => {
  const [todolists, setTodolists] = useState<Todolist[]>([]);
  const [tasks, setTasks] = useState<Record<string, Task[]>>({});

  useEffect(() => {
    todolistsApi.getTodolists().then((res) => {
      const todolists = res.data;
      setTodolists(todolists);
      todolists.forEach((todolist) => {
        tasksApi.getTasks(todolist.id).then((res) => {
          // setTasks({ ...tasks, [todolist.id]: res.items });
          setTasks((prevTask) => ({ ...prevTask, [todolist.id]: res.items }));
        });
      });
    });
  }, []);

  const createTodolist = (title: string) => {
    todolistsApi.createTodolist(title).then((res) => {
      const newTodolist = res.data.data.item;
      setTodolists([newTodolist, ...todolists]);
    });
  };

  const deleteTodolist = (id: string) => {
    todolistsApi.deleteTodolist(id).then(() => {
      setTodolists(todolists.filter((todolist) => todolist.id !== id));
    });
  };

  const changeTodolistTitle = (id: string, title: string) => {
    todolistsApi.changeTodolistTitle(id, title).then(() => {
      setTodolists(todolists.map((todolist) => (todolist.id === id ? { ...todolist, title: title } : todolist)));
    });
  };

  const createTask = (todolistId: string, title: string) => {
    tasksApi.createTask(todolistId, title).then((res) => {
      const newTask = res.data.data.item;
      const currentTasks = tasks[todolistId] ?? [];

      setTasks({ ...tasks, [todolistId]: [newTask, ...currentTasks] });
    });
  };

  const deleteTask = (todolistId: string, taskId: string) => {
    tasksApi.deleteTask(todolistId, taskId).then((res) => {
      setTasks({
        ...tasks,
        [todolistId]: tasks[todolistId].filter((t) => t.id !== taskId),
      });
    });
  };

  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>, task: Task) => {
    const model: UpdateTaskModel = {
      description: task.description,
      title: task.title,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      status: e.target.checked ? TaskStatus.Completed : TaskStatus.New,
    };

    tasksApi.updateTask({ todolistId: task.todoListId, taskId: task.id, model }).then((res) => {
      const updatedTask = res.data.data.item;

      setTasks({
        ...tasks,
        // [task.todoListId]: tasks[task.todoListId].map((t) => (t.id === task.id ? { ...t, ...model } : t)),
        [task.todoListId]: tasks[task.todoListId].map((t) => (t.id === task.id ? updatedTask : t)),
      });
    });
  };

  const changeTaskTitle = (task: Task, title: string) => {
    const model: UpdateTaskModel = {
      description: task.description,
      title: title,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      status: task.status,
    };

    tasksApi.updateTask({ todolistId: task.todoListId, taskId: task.id, model }).then((res) => {
      const updatedTask = res.data.data.item;

      setTasks({
        ...tasks,
        // [task.todoListId]: tasks[task.todoListId].map((t) => (t.id === task.id ? { ...t, ...model } : t)),
        [task.todoListId]: tasks[task.todoListId].map((t) => (t.id === task.id ? updatedTask : t)),
      });
    });
  };

  return (
    <div style={{ margin: "20px" }}>
      <AddItemForm addItem={createTodolist} />
      {todolists.map((todolist) => (
        <div key={todolist.id} style={container}>
          <div>
            <EditableSpan title={todolist.title} onchange={(title) => changeTodolistTitle(todolist.id, title)} />
            <button onClick={() => deleteTodolist(todolist.id)}>x</button>
          </div>
          <AddItemForm addItem={(title) => createTask(todolist.id, title)} />
          {tasks[todolist.id]?.map((task) => (
            <div key={task.id}>
              <Checkbox checked={task.status === TaskStatus.Completed} onChange={(e) => changeTaskStatus(e, task)} />
              <EditableSpan title={task.title} onchange={(title) => changeTaskTitle(task, title)} />
              <button onClick={() => deleteTask(todolist.id, task.id)}>x</button>
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
