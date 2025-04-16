import React from "react";
import { useAuth } from "@src/context/Auth";
import { Navigate, Outlet } from "react-router";
import Login from "@src/pages/auth/Login";

const Protected = () => {
  const { authenticated } = useAuth();
  if (authenticated == false) {
    return (
      <>
      <Login />
      </>
    );
  }

  return authenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default Protected;
