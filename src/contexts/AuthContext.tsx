
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define the context type
interface AuthContextType {
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Props interface for AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

// Auth provider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check localStorage on mount
  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(storedLoginStatus);
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    // In a real app, this would call your authentication API
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        // Mock successful login
        localStorage.setItem("isLoggedIn", "true");
        setIsLoggedIn(true);
        resolve();
      }, 1000);
    });
  };

  // Register function
  const register = async (name: string, email: string, password: string) => {
    // In a real app, this would call your registration API
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        // Mock successful registration
        localStorage.setItem("isLoggedIn", "true");
        setIsLoggedIn(true);
        resolve();
      }, 1000);
    });
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
