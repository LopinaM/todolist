import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "src/common/hooks";
import { createTodolist } from "src/features/todolists/model/todolists-slice";
import { Container, Grid2 } from "@mui/material";
import { AddItemForm } from "src/common/components";
import { Todolists } from "src/features/todolists/ui/Todolists/Todolits";
import { selectIsLoggedIn } from "src/features/auth/model/auth-slice";
import { Navigate, useNavigate } from "react-router";
import { Path } from "src/common/routing/Routing";
import { useCreateTodolistMutation } from "src/features/todolists/api/todolistsApi";

export const Main = () => {
  // const dispatch = useAppDispatch();

  // const navigate = useNavigate();

  // const addTodolist = React.useCallback(
  //   (title: string) => {
  //     dispatch(createTodolist({ title }));
  //   },
  //   [dispatch],
  // );

  const [createTodolist] = useCreateTodolistMutation();

  const addTodolist = (title: string) => {
    createTodolist(title);
  };

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
