import { AppBar, Box, Button, IconButton, LinearProgress, Switch, Toolbar, Typography } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { MenuButton } from "../MenuButton/MenuButton";
import { useAppDispatch, useAppSelector } from "src/common/hooks";
import { changeThemeModeAC, selectStatus, selectThemeMode } from "src/app/app-clice";
import { logoutTC, selectIsLoggedIn } from "src/features/auth/model/auth-slice";

export const Header = () => {
  const themeMode = useAppSelector(selectThemeMode);
  const status = useAppSelector(selectStatus);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();

  const onChangeThemeMode = () => {
    dispatch(changeThemeModeAC({ themeMode: themeMode === "light" ? "dark" : "light" }));
  };

  const logoutHandler = () => {
    dispatch(logoutTC());
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
          {isLoggedIn && (
            <Button variant="outlined" color="inherit" onClick={logoutHandler}>
              Logout
            </Button>
          )}

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
