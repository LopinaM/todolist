import { Button, Container } from "@mui/material";
import styles from "./PageNotFound.module.css";
import { Link } from "react-router";
import { Path } from "src/common/routing/Routing";

export const PageNotFound = () => (
  <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
    <h1 className={styles.title}>404</h1>
    <h2 className={styles.subtitle}>page not found</h2>
    <Button component={Link} to={Path.Main} variant="contained" sx={{ width: "330px", mt: "20px" }}>
      Вернуться на главную
    </Button>
  </Container>
);
