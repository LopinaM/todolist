import { useAppSelector } from "src/common/hooks/useAppSelector";
import { Grid2, Paper } from "@mui/material";
import { TodolistItem } from "./TodolistItem/TodolistItem";
import { useEffect } from "react";
import { useAppDispatch } from "src/common/hooks";
import { fetchTodolistsTC, selectTodolists } from "../../model/todolists-slice";
import { useGetTodolistsQuery } from "../../api/todolistsApi";

export const Todolists = () => {
  // const todolists = useAppSelector(selectTodolists);
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(fetchTodolistsTC());
  // }, []);
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
