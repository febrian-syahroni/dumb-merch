import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import axios from "axios";

interface AuthContextProps {
  isAuthenticated: boolean;
  loginUser: (email: string, password: string) => Promise<void>;
  logoutUser: () => void;
  status: "idle" | "loading" | "success" | "error";
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Periksa token di localStorage saat pertama kali aplikasi dimuat
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const loginUser = async (email: string, password: string) => {
    setStatus("loading");
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        { email, password }
      );
      const { token } = response.data;
      localStorage.setItem("token", token);
      setIsAuthenticated(true);
      setStatus("success");
    } catch (error) {
      setStatus("error");
      console.error("Login failed", error);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, loginUser, logoutUser, status }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
