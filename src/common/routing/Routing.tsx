import { Route, Routes } from "react-router";
import { Main } from "src/app/Main";
import { Login } from "src/features/todolists/auth/ui/Login/Login";
import { PageNotFound } from "../components";

export const Path = {
  Main: "/",
  Login: "login",
  NotFound: "*",
} as const;

export const Routing = () => (
  <Routes>
    <Route path={Path.Main} element={<Main />} />
    <Route path={Path.Login} element={<Login />} />
    <Route path={Path.NotFound} element={<PageNotFound />} />
  </Routes>
);
