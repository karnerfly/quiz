import React from "react";
import { Routes, Route, createBrowserRouter } from "react-router";
import Base from "./pages/layouts/Base";

import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Features from "./pages/Features";
import Faq from "./pages/Faq";

import Quiz from "./pages/features/Quiz";
import Poll from "./pages/features/Poll";
import Survey from "./pages/features/Survey";

import Protected from "./pages/layouts/Protected";

import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";

import Dashboard from "./pages/layouts/Dashboard";
import DbHome from "./pages/users/DbHome";
import Profile from "./pages/users/Profile";
import Settings from "./pages/users/Settings";
import Quizzes from "./pages/users/Quizzes";
import Create from "./pages/users/Create";
import Result from "./pages/users/Result";
import QuizReal from "./pages/QuizReal";
import Analysis from "./pages/Analysis";

// const App = () => {
//   return (
//     <Routes>
//       <Route path="" element={<Base />}>
//         <Route path="" index element={<HomePage />} />
//         <Route path="About" element={<About />} />
//         <Route path="Contact" element={<Contact />} />
//         <Route path="Features" element={<Features />} />
//         <Route path="Faq" element={<Faq />} />

//         <Route path="features/quiz" element={<Quiz />} />
//         <Route path="features/poll" element={<Poll />} />
//         <Route path="features/survey" element={<Survey />} />

//         <Route path="auth/register" element={<Register />} />
//           <Route path="auth/login" element={<Login />} />
//           <Route path="auth/forgotpass" element={<ForgotPass />} />

//         <Route element={<Protected />}>
//           <Route
//             path="protected"
//             element={
//               <div className="h-screen text-black flex items-center justify-center">
//                 protected route
//               </div>
//             }
//           />
//         </Route>
//       </Route>
//     </Routes>
//   );
// };

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
        path: "quizreal",
        element: <QuizReal />
      },
      {
        path: "analysis",
        element: <Analysis />
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

      // auth sub routes
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

      // // protected routes
      // {
      //   path: "dashboard",
      //   element: (
      //     <Protected>
      //       <DbHome />
      //     </Protected>
      //   ),
      // },
    ],
  },

  // dashboard route
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "",
        element: (
          <Protected>
            <DbHome />
          </Protected>
        ),
      },
      {
        path: "profile",
        element: (
          <Protected>
            <Profile />
          </Protected>
        ),
      },
      {
        path: "settings",
        element: (
          <Protected>
            <Settings />
          </Protected>
        ),
      },
      {
        path: "quizzes",
        children: [
          {
            path: "",
            element: (
              <Protected>
                <Quizzes />
              </Protected>
            ),
          },
          {
            path: "create",
            element: (
              <Protected>
                <Create />
              </Protected>
            ),
          },

          {
            path: "result",
            element: (
              <Protected>
                <Result />
              </Protected>
            ),
          },
        ],
      },
    ],
  },

  // quiz route
  //{
  // path: "quizzes",
  // element: <Quizzes />,
  // children: [
  // {
  //   path: "create",
  //  element: (
  //    <Protected>
  //     <Create />
  //   </Protected>
  //  ),
  //  }
  // ],
  // },
]);
