import React from "react";
import { useAuth } from "@src/context/Auth";
import { useNavigate } from "react-router";
import { Loader } from "lucide-react";

const Protected = ({ children }) => {
  const { token, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-xl bg-transparent">
        <Loader />
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
