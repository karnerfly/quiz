import React from "react";
import { useAuth } from "@src/context/Auth";
import { Navigate, Outlet, useNavigate } from "react-router";
import Login from "@src/pages/auth/Login";

const Protected = ({ children }) => {
  const { token } = useAuth();
  const navigate = useNavigate();

  // token still not fetched, show loader
  if (token === undefined) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-xl text-black">Loading...</p>
      </div>
    );
  }

  // user is not authenticated
  if (token === null) {
    return navigate("/auth/login", { replace: true });
  }

  return children;
};

export default Protected;
