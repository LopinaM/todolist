import { Route, Routes } from "react-router";
import { Main } from "src/app/Main";
import { Login } from "src/features/todolists/auth/ui/Login/Login";
import { PageNotFound } from "../components";
import { ProtectedRoute } from "../components/ProtectedRoute/ProtectedRoute";
import { useAppSelector } from "../hooks";
import { selectIsLoggedIn } from "src/app/app-clice";

export const Path = {
  Main: "/",
  Login: "/login",
  NotFound: "*",
} as const;

export const Routing = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return (
    <Routes>
      {/* если пользователь залогинен, сюда добавлять остальные пути */}
      <Route element={<ProtectedRoute isAllowed={isLoggedIn} />}>
        <Route path={Path.Main} element={<Main />} />
      </Route>

      {/* <Route element={<ProtectedRoute isAllowed={!isLoggedIn} redirectPath={Path.Main} />}>
        <Route path={Path.Login} element={<Login />} />
      </Route> */}

      <Route
        path={Path.Login}
        element={
          <ProtectedRoute isAllowed={!isLoggedIn} redirectPath={Path.Main}>
            <Login />
          </ProtectedRoute>
        }
      />
      <Route path={Path.NotFound} element={<PageNotFound />} />
    </Routes>
  );
};
