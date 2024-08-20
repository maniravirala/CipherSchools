import { createContext, useState, useEffect, useContext } from "react";
import { login, register, logout } from "@/services/authService";
import Cookies from "js-cookie";
import { useLocalStorage } from "@uidotdev/usehooks";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage('isLoggedIn', false);

  const token = Cookies.get("token");

  useEffect(() => {
    setIsLoggedIn(!!token); // Ensure token is treated as a boolean
  }, [token]);

  const handleLogin = async (email, password) => {
    try {
      const response = await login(email, password); // login from authService
      // Cookies.set("token", response.token); 
      setIsLoggedIn(true); // Update the login state
      return response;
    } catch (error) {
      console.error("Login failed:", error);
      throw error; // Propagate error to handle in component
    }
  };

  const handleRegister = async (name, email, password) => {
    try {
      const response = await register(name, email, password); // register from authService
      // Cookies.set("token", response.token);  
      setIsLoggedIn(true); // Update login state
      return response;
    } catch (error) {
      console.error("Registration failed:", error);
      throw error; // Propagate error to handle in component
    }
  };

  const handleLogout = async () => {
    try {
      const response = await logout(); // logout from authService
      // Cookies.remove("token"); 
      setIsLoggedIn(false); // Update the login state
      return response;
    } catch (error) {
      console.error("Logout failed:", error);
      throw error; // Propagate error to handle in component
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, handleLogin, handleRegister, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
