import { AppBar, Button, IconButton, Switch, Toolbar, Typography } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { MenuButton } from "../MenuButton/MenuButton";
import { useAppDispatch, useAppSelector } from "src/common/hooks";
import { changeThemeModeAC, selectThemeMode } from "src/app/app-clice";

export const Header = () => {
  const themeMode = useAppSelector(selectThemeMode);
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
        <div>
          <Button variant="outlined" color="inherit">
            Login
          </Button>
          <Button variant="outlined" color="inherit">
            Logout
          </Button>
          <Button variant="outlined" color="inherit">
            Faq
          </Button>
        </div>
        <Switch onChange={onChangeThemeMode} />
      </Toolbar>
    </AppBar>
  );
};
