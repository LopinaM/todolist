import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from './App';
// import App from "./AppWıthReducers";
import AppWithRedux from "./AppWıthRedux";
import { Provider } from "react-redux";
import { store } from "./state/store";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Theme } from "./Theme";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <Provider store={store}>
        <AppWithRedux />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
