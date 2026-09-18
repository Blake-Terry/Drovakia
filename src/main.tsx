import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./site/App";
import "./styles/base.css";
import "./styles/effects.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
