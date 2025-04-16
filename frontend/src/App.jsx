import React from "react";
import { Routes, Route } from "react-router";
import Base from "./pages/layouts/Base";
import HomePage from "./pages/HomePage";

import Quiz from "./pages/features/Quiz";
import Poll from "./pages/features/Poll";
import Survey from "./pages/features/Survey";

const App = () => {
  return (
    <Routes>
      <Route path="" element={<Base />}>
      <Route path="/" index element={<HomePage />} />

      <Route path="/features/Quiz" index element={<Quiz />} />
      <Route path="/features/Poll" index element={<Poll />} />
      <Route path="/features/Survey" index element={<Survey />} />


      </Route>
    </Routes>
  );
};

export default App;
