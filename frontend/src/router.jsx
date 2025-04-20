import React from "react";
import { Routes, Route, createBrowserRouter } from "react-router";

//Base Layout
import Base from "./pages/layouts/Base";

// Public Route - General Pages
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Features from "./pages/Features";
import Faq from "./pages/Faq";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import Support from "./pages/Support";
import Sitemap from "./pages/Sitemap";

// public Route - Features Pages
import Quiz from "./pages/features/Quiz";
import Poll from "./pages/features/Poll";
import Survey from "./pages/features/Survey";

// Protected Layout
import Protected from "./pages/layouts/Protected";

// Auth Pages
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";

// Dashboard Pages
import Dashboard from "./pages/layouts/Dashboard";
import DbHome from "./pages/users/DbHome";
import Profile from "./pages/users/Profile";
import Settings from "./pages/users/Settings";
import Quizzes from "./pages/users/Quizzes";
import Create from "./pages/users/Create";
import Result from "./pages/users/Result";
import Analysis from "./pages/Analysis";
import AutheProvider from "./context/Auth";

//Users Quiz Pages
import QuizReal from "./pages/QuizReal";
import StudentQuizPage from "./pages/attendquiz/StudentQuizPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Base />,
    children: [
      // public routes
      {
        path: "",
        element: <HomePage />,
        index: true,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "features",
        element: <Features />,
      },
      {
        path: "faq",
        element: <Faq />,
      },
      {
        path: "privacy_Policy",
        element: <PrivacyPolicy />

      },
      {
        path: "terms",
        element: <Terms />
      },
      {
        path: "support",
        element: <Support />
      },
      {
        path: "sitemap",
        element: <Sitemap />
      },
      {
        path: "quizreal",
        element: <QuizReal />,
      },
      {
        path: "analysis",
        element: <Analysis />,
      },
      {
        path: "studentquizpage",
        element: <StudentQuizPage />
      },

      // features sub route
      {
        path: "features",
        children: [
          {
            path: "quiz",
            element: <Quiz />,
          },
          {
            path: "poll",
            element: <Poll />,
          },
          {
            path: "survey",
            element: <Survey />,
          },
          {
            path: "quiz",
            element: <Quiz />,
          },
        ],
      },
    ],
  },

  // auth route - needs AuthProvider
  {
    path: "auth",
    element: (
      <AutheProvider>
        <Base />
      </AutheProvider>
    ),
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "forgotpassword",
        element: <ForgotPassword />,
      },
    ],
  },

  // dashboard route - needs AuthProvider
  {
    path: "dashboard",
    element: (
      <AutheProvider>
        <Protected>
          <Dashboard />
        </Protected>
      </AutheProvider>
    ),
    children: [
      {
        path: "",
        element: <DbHome />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "quizzes",
        children: [
          {
            path: "",
            element: <Quizzes />,
          },
          {
            path: "create",
            element: <Create />,
          },

          {
            path: "result",
            element: <Result />,
          },
        ],
      },
    ],
  },
]);
