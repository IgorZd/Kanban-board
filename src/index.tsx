import React from "react";
import ReactDOM from "react-dom";

import { store } from "./app/store";
import { Provider } from "react-redux";
// @ts-ignore
import "./styles/global.css";
// @ts-ignore
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import App from "./app/App";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
