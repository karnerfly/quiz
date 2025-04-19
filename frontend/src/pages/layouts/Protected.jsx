import React from "react";
import { useAuth } from "@src/context/Auth";
import { useNavigate } from "react-router";

const Protected = ({ children }) => {
  const { token } = useAuth();
  const navigate = useNavigate();

  // user is not authenticated
  if (token === null) {
    return navigate("/auth/login", { replace: true });
  }

  return children;
};

export default Protected;
