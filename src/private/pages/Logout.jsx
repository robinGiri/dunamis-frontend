import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../public/auth_context/AuthProvider";

export default function Logout() {
  const { setAuthUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user information from localStorage
    localStorage.removeItem("USER");
    // Update the auth context
    setAuthUser(null);
    // Navigate to the home page (or login page)
    navigate("/", { replace: true });
    // Optionally, reload the page to reset state in the app
    window.location.reload();
  }, [navigate, setAuthUser]);

  return null;
}
