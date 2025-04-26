import { Grid2, Paper } from "@mui/material";
import { TodolistItem } from "./TodolistItem/TodolistItem";
import { useGetTodolistsQuery } from "../../api/todolistsApi";

export const Todolists = () => {
  const { data: todolists } = useGetTodolistsQuery();

  return (
    <>
      {todolists?.map((td) => {
        return (
          <Grid2 key={td.id}>
            <Paper elevation={3} style={{ padding: "10px" }}>
              <TodolistItem todolist={td} />
            </Paper>
          </Grid2>
        );
      })}
    </>
  );
};
