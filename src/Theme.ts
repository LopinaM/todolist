import { createTheme } from "@mui/material";
import { deepPurple, indigo } from "@mui/material/colors";

export const Theme = createTheme({
  palette: {
    primary: deepPurple,
    secondary: indigo,
    mode: "light", // || "dark",
  },
});
