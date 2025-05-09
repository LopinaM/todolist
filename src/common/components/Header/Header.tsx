import { AppBar, Box, Button, LinearProgress, Switch, Toolbar, Typography } from "@mui/material";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import { useAppDispatch, useAppSelector } from "src/common/hooks";
import { changeThemeModeAC, selectIsLoggedIn, selectStatus, selectThemeMode, setIsLoggedInAC } from "src/app/app-clice";
import { useLogoutMutation } from "src/features/auth/api/authApi";
import { ResultCode } from "src/common/enums";
import { AUTH_TOKEN } from "src/common/constants";
import { baseApi } from "src/app/baseApi";
import list from "../../assets/list.png";

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
    logout()
      .then((res) => {
        if (res.data?.resultCode === ResultCode.Success) {
          dispatch(setIsLoggedInAC({ isLoggedIn: false }));
          localStorage.removeItem(AUTH_TOKEN);
          // dispatch(baseApi.util.resetApiState());
        }
      })
      .then(() => {
        dispatch(baseApi.util.invalidateTags(["Todolist", "Tasks"]));
      });
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <div style={{ display: "flex", flexGrow: 1, gap: 5, alignItems: "center" }}>
          <InventoryOutlinedIcon />
          <Typography variant="h6">To-Do Lists</Typography>
          {/* <img src={list} alt="list" style={{ width: 20, height: 20, color: "#fff" }} /> */}
        </div>

        {isLoggedIn && (
          <Box sx={{ display: "flex", gap: "10px" }}>
            <Button variant="outlined" color="inherit" onClick={logoutHandler}>
              Logout
            </Button>
          </Box>
        )}

        <Switch onChange={onChangeThemeMode} />
      </Toolbar>
      {status === "loading" && <LinearProgress color="secondary" />}
    </AppBar>
  );
};
