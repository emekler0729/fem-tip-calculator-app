import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createGlobalStyle } from "styled-components";

const Reset = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`;

ReactDOM.render(
    <React.StrictMode>
        <Reset></Reset>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);
