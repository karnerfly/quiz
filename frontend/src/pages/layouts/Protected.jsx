import React from "react";
import { useAuth } from "@src/context/Auth";
import { Navigate, Outlet } from "react-router";

const Protected = () => {
  const { authenticated } = useAuth();
  if (authenticated == undefined) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-900 text-xl">loading..</p>
      </div>
    );
  }

  return authenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default Protected;
