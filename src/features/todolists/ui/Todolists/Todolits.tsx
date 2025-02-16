import { useAppSelector } from "src/common/hooks/useAppSelector";
import { Grid2, Paper } from "@mui/material";
import { TodolistItem } from "./TodolistItem/TodolistItem";
import { selectTodolists } from "../../model/todolists-selectors";

export const Todolists = () => {
  const todolists = useAppSelector(selectTodolists);

  return (
    <>
      {todolists.map((td) => {
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
