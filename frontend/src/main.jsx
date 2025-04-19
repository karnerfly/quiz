import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { router } from "./router.jsx";
import "./index.css";
import AutheProvider from "./context/Auth.jsx";

createRoot(document.getElementById("root")).render(
  <AutheProvider>
    <RouterProvider router={router} />
  </AutheProvider>
);
