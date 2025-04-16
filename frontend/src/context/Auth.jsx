import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({
  authenticated: null,
  login: () => {},
  logout: () => {},
});

const AutheProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState();

  useEffect(() => {
    const timeout = setTimeout(() => {
      const state = localStorage.getItem("auth") || false;
      setAuthenticated(state);

      return () => clearTimeout(timeout);
    }, 1000);
  }, []);

  const login = () => {
    localStorage.setItem("auth", true);
    setAuthenticated(true);
  };

  const logout = () => {
    localStorage.setItem("auth", false);
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ authenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AutheProvider;
