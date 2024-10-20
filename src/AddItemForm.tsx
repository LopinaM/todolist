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
      <input
        value={newTaskTitle}
        onChange={onNewTaskTitleChange}
        onKeyDown={onKeyDown}
        className={error ? "error" : ""}
      />
      <button onClick={addTask}>+</button>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};
