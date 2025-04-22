import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "src/common/hooks";
import { createTodolist } from "src/features/todolists/model/todolists-slice";
import { Container, Grid2 } from "@mui/material";
import { AddItemForm } from "src/common/components";
import { Todolists } from "src/features/todolists/ui/Todolists/Todolits";
import { selectIsLoggedIn } from "src/features/auth/model/auth-slice";
import { Navigate, useNavigate } from "react-router";
import { Path } from "src/common/routing/Routing";

export const Main = () => {
  // const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const addTodolist = React.useCallback(
    (title: string) => {
      dispatch(createTodolist({ title }));
    },
    [dispatch],
  );

  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     navigate(Path.Login);
  //   }
  // }, [isLoggedIn]);

  // if (!isLoggedIn) {
  //   return <Navigate to={Path.Login} />;
  // }

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
