import { Add } from "@mui/icons-material";
import { Button, IconButton, TextField } from "@mui/material";
import React from "react";

type AddItemFormPropsType = {
  addItem: (title: string) => void;
};

export const AddItemForm = (props: AddItemFormPropsType) => {
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
      props.addItem(newTaskTitle.trim());
      setNewTaskTitle("");
    } else {
      setError("Field is required");
    }
  };

  return (
    <div>
      <TextField
        variant="outlined"
        label="Type Value"
        value={newTaskTitle}
        onChange={onNewTaskTitleChange}
        onKeyDown={onKeyDown}
        error={!!error}
        helperText={error}
      />
      <IconButton onClick={addTask} color={"secondary"}>
        <Add />
      </IconButton>
    </div>
  );
};
