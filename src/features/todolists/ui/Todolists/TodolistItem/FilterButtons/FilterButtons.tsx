import React from "react";
import { Box, Button } from "@mui/material";
import { filterButtonsContainerSx } from "./FilterButtons.styles";
import { useAppDispatch } from "src/common/hooks/useAppDispatch";
import {
  changeTodolistFilterAC,
  FilterValuesType,
  TodolistType,
} from "src/features/todolists/model/todolists-reducer";

type propsType = {
  todolist: TodolistType;
};

export const FilterButtons = React.memo(({ todolist }: propsType) => {
  const dispatch = useAppDispatch();

  const changeFilter = React.useCallback(
    (filter: FilterValuesType) => {
      dispatch(
        changeTodolistFilterAC({
          filter: filter,
          todolistId: todolist.id,
        })
      );
    },
    [dispatch, todolist.id]
  );

  return (
    <Box sx={filterButtonsContainerSx}>
      <Button
        variant={todolist.filter === "All" ? "contained" : "text"}
        onClick={() => changeFilter("All")}
      >
        All
      </Button>
      <Button
        color="primary"
        variant={todolist.filter === "Active" ? "contained" : "text"}
        onClick={() => changeFilter("Active")}
      >
        Active
      </Button>
      <Button
        color="secondary"
        variant={todolist.filter === "Completed" ? "contained" : "text"}
        onClick={() => changeFilter("Completed")}
      >
        Completed
      </Button>
    </Box>
  );
});
