import React from "react";
import { useAppDispatch } from "src/common/hooks";
import { addTodolistTC } from "src/features/todolists/model/todolists-slice";
import { Container, Grid2 } from "@mui/material";
import { AddItemForm } from "src/common/components";
import { Todolists } from "src/features/todolists/ui/Todolists/Todolits";

export const Main = () => {
  const dispatch = useAppDispatch();

  const addTodolist = React.useCallback(
    (title: string) => {
      dispatch(addTodolistTC({ title }));
    },
    [dispatch],
  );

  return (
    <Container fixed>
      <Grid2 container style={{ padding: "20px 0px" }}>
        <AddItemForm addItem={addTodolist} />
      </Grid2>
      <Grid2 container spacing={4}>
        <Todolists />
      </Grid2>
    </Container>
  );
};
