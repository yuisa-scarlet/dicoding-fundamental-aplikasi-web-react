import { createContext, useContext, useState, useEffect } from "react";
import {
  getAccessToken,
  putAccessToken,
  removeAccessToken,
  getUserLogged,
  login as apiLogin,
  register as apiRegister,
} from "../utils/notes-manager";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = getAccessToken();
      if (token) {
        try {
          const result = await getUserLogged();
          if (!result.error) {
            setUser(result.data);
            setIsAuthenticated(true);
          } else {
            removeAccessToken();
            setUser(null);
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error("Error checking auth status:", error);
          removeAccessToken();
          setUser(null);
          setIsAuthenticated(false);
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const result = await apiLogin(credentials);
      if (!result.error) {
        putAccessToken(result.data.accessToken);
        const userResult = await getUserLogged();
        if (!userResult.error) {
          setUser(userResult.data);
          setIsAuthenticated(true);
          return { success: true };
        }
      }
      return { success: false, message: "Login failed" };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: "Login failed" };
    }
  };

  const register = async (userData) => {
    try {
      const result = await apiRegister(userData);
      return { success: !result.error };
    } catch (error) {
      console.error("Register error:", error);
      return { success: false, message: "Registration failed" };
    }
  };

  const logout = () => {
    removeAccessToken();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
