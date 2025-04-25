import { createContext, useContext, useEffect, useState } from "react";
import apiClient from "@src/api/client";
import { checkHealth, getAuthToken } from "@src/api";

const AuthContext = createContext();

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth hook must be inside AuthProvider");
  }

  return authContext;
};

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState();
  const [loading, setLoading] = useState(true);

  const fetchHealthOfApi = async () => {
    try {
      const ok = await checkHealth();
      if (!ok) {
        window.location.href = `/500?from=${window.location.pathname}`;
      }
    } catch (error) {}
  };

  const fetchToken = async () => {
    try {
      const token = await getAuthToken();
      setToken(token);
    } catch (error) {
      setToken(null);
    }
  };

  useEffect(() => {
    fetchHealthOfApi();
  }, []);

  useEffect(() => {
    fetchToken();
  }, [setToken]);

  useEffect(() => {
    if (token === undefined) return;

    const interceptorId = apiClient.interceptors.request.use(
      function (config) {
        config.headers.Authorization = token;
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

    setLoading(false);

    return () => {
      apiClient.interceptors.request.eject(interceptorId);
    };
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
