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

  html {
    font-size: ${(10 / 16) * 100}%;

    @media only screen and (min-width: 964px) {
      font-size: ${(12.5 / 16) * 100}%;
    }

    @media only screen and (min-width: 1150px) {
      font-size: ${(15 / 16) * 100}%;
    }
  }
`;

ReactDOM.render(
    <React.StrictMode>
        <Reset />
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);
