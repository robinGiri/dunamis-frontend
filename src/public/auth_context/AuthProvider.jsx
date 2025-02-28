import React, { createContext, useContext, useState, useEffect } from "react";

// Create the AuthContext
export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  // Retrieve the stored user from localStorage
  const storedUser = localStorage.getItem("USER");
  
  // Initialize authUser state by parsing storedUser safely.
  let initialUser = null;
  try {
    // Only parse if storedUser exists and isn't the literal string "undefined"
    if (storedUser && storedUser !== "undefined") {
      initialUser = JSON.parse(storedUser);
    }
  } catch (error) {
    // If parsing fails, fallback to null
    initialUser = null;
  }

  const [authUser, setAuthUser] = useState(initialUser);
  const [isAuthorised, setIsAuthorised] = useState(false);

  // Update isAuthorised based on authUser changes
  useEffect(() => {
    setIsAuthorised(authUser !== null);
  }, [authUser]);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, isAuthorised }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
