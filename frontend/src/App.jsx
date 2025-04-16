import React from "react";
import { Routes, Route } from "react-router";
import Base from "./pages/layouts/Base";
import HomePage from "./pages/HomePage";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Features from "./pages/Features";

import Quiz from "./pages/features/Quiz";
import Poll from "./pages/features/Poll";
import Survey from "./pages/features/Survey";
import Protected from "./pages/layouts/Protected";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login"
import ForgotPass from "./pages/auth/ForgotPass";

const App = () => {
  return (
    <Routes>
      <Route path="" element={<Base />}>
        <Route path="" index element={<HomePage />} />
        <Route path="AboutUs" element={<AboutUs />} />
        <Route path="ContactUs" element={<ContactUs />} />
        <Route path="Features" element={<Features />} />

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
          <Route path="auth/register" element={<Register />} />
          <Route path="auth/login" element={<Login />} />
          <Route path="auth/forgotpass" element={<ForgotPass />} />

        </Route>
      </Route>
    </Routes>
  );
};

export default App;
