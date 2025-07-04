import React from "react";
import { Box, Button } from "@mui/material";
import { filterButtonsContainerSx } from "./FilterButtons.styles";
import { useAppDispatch } from "src/common/hooks/useAppDispatch";
import { todolistsApi } from "src/features/todolists/api/todolistsApi";
import { FilterValuesType, TodolistType } from "src/features/todolists/lib/types/types";

type propsType = {
  todolist: TodolistType;
};

export const FilterButtons = React.memo(({ todolist }: propsType) => {
  const { id, filter } = todolist;
  const dispatch = useAppDispatch();

  const changeFilter = (filter: FilterValuesType) => {
    dispatch(
      todolistsApi.util.updateQueryData("getTodolists", undefined, (data) => {
        const todolist = data.find((todolist) => todolist.id === id);
        if (todolist) {
          todolist.filter = filter;
        }
      }),
    );
  };

  return (
    <Box sx={filterButtonsContainerSx}>
      <Button variant={filter === "All" ? "contained" : "text"} onClick={() => changeFilter("All")}>
        All
      </Button>
      <Button color="primary" variant={filter === "Active" ? "contained" : "text"} onClick={() => changeFilter("Active")}>
        Active
      </Button>
      <Button color="secondary" variant={filter === "Completed" ? "contained" : "text"} onClick={() => changeFilter("Completed")}>
        Completed
      </Button>
    </Box>
  );
});
