import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
 
// AUTH which heavily uses cookies
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = document.cookie.split("; ").find(row => row.startsWith("jwt="));
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    navigate("/dashboard");
  };

  const logout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/logout`, {
        method: "POST",
        credentials: "include", // MAKE SURE COOKIES PRESENT
      });
  
      // CHECKS AND REMOVES COOKIE
      document.cookie = "jwt=; path=/; max-age=0;";
  
      setIsAuthenticated(false);
      navigate("/");
    } catch (error) {
      console.error(" Logout failed:", error);
    }
  };
  

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
