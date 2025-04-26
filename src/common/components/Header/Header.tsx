import { AppBar, Box, Button, IconButton, LinearProgress, Switch, Toolbar, Typography } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "src/common/hooks";
import { changeThemeModeAC, selectIsLoggedIn, selectStatus, selectThemeMode, setIsLoggedInAC } from "src/app/app-clice";
import { useLogoutMutation } from "src/features/auth/api/authApi";
import { ResultCode } from "src/common/enums";
import { AUTH_TOKEN } from "src/common/constants";
import { clearDataAC } from "src/common/actions";

export const Header = () => {
  const themeMode = useAppSelector(selectThemeMode);
  const status = useAppSelector(selectStatus);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();

  const onChangeThemeMode = () => {
    dispatch(changeThemeModeAC({ themeMode: themeMode === "light" ? "dark" : "light" }));
  };

  const logoutHandler = () => {
    logout().then((res) => {
      if (res.data?.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedInAC({ isLoggedIn: false }));
        localStorage.removeItem(AUTH_TOKEN);
        dispatch(clearDataAC());
      }
    });
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
