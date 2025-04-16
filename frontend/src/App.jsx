import React from "react";
import { Routes, Route } from "react-router";
import Base from "./pages/layouts/Base";
import HomePage from "./pages/HomePage";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";

import Quiz from "./pages/features/Quiz";
import Poll from "./pages/features/Poll";
import Survey from "./pages/features/Survey";
import Protected from "./pages/layouts/Protected";

const App = () => {
  return (
    <Routes>
      <Route path="" element={<Base />}>
        <Route path="" index element={<HomePage />} />
        <Route path="AboutUs" element={<AboutUs />} />
        <Route path="ContactUs" element={<ContactUs />} />

        <Route path="features/quiz" element={<Quiz />} />
        <Route path="features/poll" element={<Poll />} />
        <Route path="features/survey" element={<Survey />} />

        <Route element={<Protected />}>
          <Route
            path="protected"
            element={
              <div className="h-screen text-black flex items-center justify-center">
                protected route
              </div>
            }
          />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
