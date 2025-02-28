import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./public/Pages/Home";
import Books from "./public/Pages/Books";
import Contact from "./public/Pages/Contact";
import About from "./public/Pages/About";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./public/auth_context/AuthProvider";
import ProtectedRoute from "./public/components/ProtectedRoute";

export default function App() {
  const Logout = () => {
    const navigate = useNavigate();
    useEffect(() => {
      localStorage.removeItem("USER");
      navigate("/", { replace: true });
      window.location.reload();
    }, [navigate]);
    return null;
  };

  return (
    <div className="dark:bg-base-100 dark:text-gray-200 bg-gray-100 text-gray-700">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/books"
              element={
                <ProtectedRoute>
                  <Books />
                </ProtectedRoute>
              }
            />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/user/logout" element={<Logout />} />
          </Routes>
        </AuthProvider>
      </Router>
      <Toaster />
    </div>
  );
}
