import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth hook must be inside in AuthProvider");
  }

  return authContext;
};

const AutheProvider = ({ children }) => {
  const [token, setToken] = useState();

  useEffect(() => {
    const timeout = setTimeout(() => {
      const token = localStorage.getItem("token");
      setToken(token);

      return () => clearTimeout(timeout);
    }, 1000);
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AutheProvider;
