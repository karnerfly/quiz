import React from "react";
import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <Routes>
      <Route path="/" index element={<HomePage />} />
    </Routes>
  );
};

export default App;
