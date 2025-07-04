import { Box, Grid2, Paper } from "@mui/material";
import { TodolistItem } from "./TodolistItem/TodolistItem";
import { useGetTodolistsQuery } from "../../api/todolistsApi";
import { TodolistSkeleton } from "./TodolistSkeleton/TodolistSkeleton";
import { filterButtonsContainerSx } from "./TodolistItem/FilterButtons/FilterButtons.styles";

export const Todolists = () => {
  const { data: todolists, isLoading } = useGetTodolistsQuery();

  if (isLoading) {
    return (
      <Box sx={filterButtonsContainerSx} style={{ gap: "32px" }}>
        {Array(5)
          .fill(null)
          .map((_, id) => (
            <TodolistSkeleton key={id} />
          ))}
      </Box>
    );
  }

  return (
    <>
      {todolists?.map((td) => {
        return (
          <Grid2 key={td.id}>
            <Paper elevation={8} style={{ padding: "10px", width: 300 }}>
              <TodolistItem todolist={td} />
            </Paper>
          </Grid2>
        );
      })}
      {todolists?.length === 0 && "empty"}
    </>
  );
};
