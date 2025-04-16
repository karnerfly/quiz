import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.jsx";
import "./index.css";
import AutheProvider from "./context/Auth.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AutheProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AutheProvider>
  </StrictMode>
);
