import apiClient from "@src/api/client";
import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import Loader from "@src/components/ui/Loader";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const resp = await apiClient.get("/auth/token");
        const token = resp.data?.response?.data?.auth_token;
        setToken(token);
      } catch (error) {
        setToken(null);
      }
    };

    fetchToken();
  }, []);

  useEffect(() => {
    if (!token) return;

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

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
        <Loader />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AutheProvider;
