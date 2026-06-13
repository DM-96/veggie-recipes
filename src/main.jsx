import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { RecipeProvider } from "./context/RecipeContext";
import { HashRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RecipeProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </RecipeProvider>
  </React.StrictMode>
);