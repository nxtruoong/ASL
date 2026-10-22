import React from "react";
import { createRoot } from "react-dom/client";
import AuthRoot from "./AuthRoot.jsx";
import "./style.css";
import "./experience.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthRoot />
  </React.StrictMode>
);
