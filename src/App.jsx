import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./public/Pages/Home";
import Books from "./public/Pages/Books";
import Contact from "./public/Pages/Contact";
import About from "./public/Pages/About";
import AdminPanel from "./private/pages/AdminPanel";
import QuizTake from "./private/pages/QuizTake";
import Profile from "./private/pages/Profile";
import Logout from "./private/pages/Logout";
import CourseDetails from "./public/Pages/CourseDetails";
import Learn from "./public/Pages/Learn";
import AuthProvider from "./public/auth_context/AuthProvider";
import ProtectedRoute from "./public/components/ProtectedRoute";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <div className="dark:bg-base-100 dark:text-gray-200 bg-gray-100 text-gray-700">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<ProtectedRoute><Books /></ProtectedRoute>} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
            <Route path="/quiz/take" element={<ProtectedRoute><QuizTake /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/course/:id" element={<CourseDetails />} />
            <Route path="/learn/:id" element={<Learn />} />
            <Route path="/user/logout" element={<Logout />} />
          </Routes>
        </AuthProvider>
      </Router>
      <Toaster />
    </div>
  );
}
