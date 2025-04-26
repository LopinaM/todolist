import { Container, Grid2 } from "@mui/material";
import { AddItemForm } from "src/common/components";
import { Todolists } from "src/features/todolists/ui/Todolists/Todolits";
import { useCreateTodolistMutation } from "src/features/todolists/api/todolistsApi";

export const Main = () => {
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
