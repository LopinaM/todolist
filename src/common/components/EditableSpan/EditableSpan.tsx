import { Input } from "@mui/material";
import React from "react";

type EditableSpanPropsType = {
  title: string;
  onchange: (newValue: string) => void;
};

export const EditableSpan = React.memo(
  ({ title, onchange }: EditableSpanPropsType) => {
    const [editMode, setEditMode] = React.useState(false);
    const [newTitle, setNewTitle] = React.useState("");

    const activateEditMode = () => {
      setEditMode(true);
      setNewTitle(title);
    };
    const activateViewMode = () => {
      setEditMode(false);
      onchange(newTitle);
    };

    const onNewTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewTitle(e.currentTarget.value);
    };

    return editMode ? (
      <Input
        value={newTitle}
        onBlur={activateViewMode}
        autoFocus
        onChange={onNewTitleChange}
      />
    ) : (
      <span onDoubleClick={activateEditMode}>{title}</span>
    );
  }
);
