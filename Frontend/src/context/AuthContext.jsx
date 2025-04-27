import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Create the context
const AuthContext = createContext();

// Provide context values
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail") || null); // Saving email
  const navigate = useNavigate();

  // Handle login
  const login = (token, email) => {
    setToken(token);
    setUserEmail(email);
    localStorage.setItem("token", token); // Save token to localStorage
    localStorage.setItem("userEmail", email); // Save email to localStorage
    navigate("/dashboard");
  };

  // Handle logout
  const logout = () => {
    setToken(null);
    setUserEmail(null);
    localStorage.removeItem("token"); // Remove token from localStorage
    localStorage.removeItem("userEmail"); // Remove email from localStorage
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use Auth context
export const useAuth = () => useContext(AuthContext);
