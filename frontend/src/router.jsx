import React from "react";
import { createBrowserRouter } from "react-router";
import Base from "./pages/layouts/Base";

// Public Route - General Pages
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Features from "./pages/Features";
import Faq from "./pages/Faq";
// import PrivacyPolicy from "./pages/PrivacyPolicy";
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
import QuizCreateLayout from "./pages/users/quiz/QuizCreateLayout";
import Result from "./pages/users/Result";
import Analysis from "./pages/attendquiz/Analysis";

import Error500Page from "./pages/errors/Error500Page";
import Error404Page from "./pages/errors/Error404Page";

import UserProvider from "./context/User";
import SharePopup from "./components/dashboard/SharePopup";

//Users Quiz Pages
import QuizReal from "./pages/QuizReal";
import QuizAttendLayout from "./pages/attendquiz/QuizAttendLayout";
import AuthProvider from "./context/Auth";

export const router = createBrowserRouter([
  // public routes
  {
    path: "/",
    element: (
      <AuthProvider>
        <Base />
      </AuthProvider>
    ),
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
      // {
      //   path: "privacy",
      //   element: <PrivacyPolicy />,
      // },
      {
        path: "terms",
        element: <Terms />,
      },
      {
        path: "support",
        element: <Support />,
      },
      {
        path: "sitemap",
        element: <Sitemap />,
      },
      {
        path: "quizreal",
        element: <QuizReal />,
      },
      {
        path: "quiz",
        children: [
          {
            path: "",
            element: <QuizAttendLayout />,
          },
          {
            path: "analysis",
            element: <Analysis />,
          },
        ],
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

      // auth routes - needs AuthProvider
      {
        path: "auth",
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
    ],
  },

  // dashboard routes - needs AuthProvider
  {
    path: "dashboard",
    element: (
      <AuthProvider>
        <Protected>
          <UserProvider>
            <Dashboard />
          </UserProvider>
        </Protected>
      </AuthProvider>
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
            element: <QuizCreateLayout />,
          },

          {
            path: "result",
            element: <Result />,
          },
        ],
      },
    ],
  },

  // error routes
  {
    path: "/500",
    element: <Error500Page />,
  },
  // this route should always at end of all routes
  {
    path: "*",
    element: <Error404Page />,
  },
]);
