import React from "react";
import { Routes, Route } from "react-router";
import Base from "./pages/layouts/Base";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <Routes>
      <Route path="" element={<Base />}>
      <Route path="/" index element={<HomePage />} />

      </Route>
    </Routes>
  );
};

export default App;
