import { AppBar, Box, Button, IconButton, LinearProgress, Switch, Toolbar, Typography } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { MenuButton } from "../MenuButton/MenuButton";
import { useAppDispatch, useAppSelector } from "src/common/hooks";
import { changeThemeModeAC, selectStatus, selectThemeMode } from "src/app/app-clice";

export const Header = () => {
  const themeMode = useAppSelector(selectThemeMode);
  const status = useAppSelector(selectStatus);
  const dispatch = useAppDispatch();

  const onChangeThemeMode = () => {
    dispatch(changeThemeModeAC({ themeMode: themeMode === "light" ? "dark" : "light" }));
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <Menu />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          News
        </Typography>
        <Box sx={{ display: "flex", gap: "10px" }}>
          <Button variant="outlined" color="inherit">
            Login
          </Button>
          <Button variant="outlined" color="inherit">
            Logout
          </Button>
          <Button variant="outlined" color="inherit">
            Faq
          </Button>
        </Box>
        <Switch onChange={onChangeThemeMode} />
      </Toolbar>
      {status === "loading" && <LinearProgress color="secondary" />}
    </AppBar>
  );
};
