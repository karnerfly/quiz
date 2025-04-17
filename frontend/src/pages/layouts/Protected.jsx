import React from "react";
import { useAuth } from "@src/context/Auth";
import { useNavigate } from "react-router";
import Loader from "@src/components/ui/Loader";

const Protected = ({ children }) => {
  const { token } = useAuth();
  const navigate = useNavigate();

  // token still not fetched, show loader
  if (token === undefined) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
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
