import React, { useState } from "react";
import QuizAdmin from "./QuizAdmin";
import CourseAdmin from "./CourseAdmin";
import StudentAdmin from "./StudentAdmin";
import CategoryAdmin from "./CategoryAdmin";
import { NavLink } from "react-router-dom";

export default function AdminPanel() {
  // State to track which admin section is active.
  const [activeSection, setActiveSection] = useState("quiz");
  // Define active and inactive class names using daisyUI/Tailwind classes
  const activeClass = "bg-primary text-white rounded-lg py-2 text-2xl font-bold mb-6";
  const inactiveClass =
    "text-base-content hover:bg-base-200 rounded-lg py-2 transition-colors duration-300 text-2xl font-bold mb-6";

  // Render the active section based on the state.
  const renderContent = () => {
    switch (activeSection) {
      case "quiz":
        return <QuizAdmin />;
      case "course":
        return <CourseAdmin />;
      case "student":
        return <StudentAdmin />;
      case "category":
        return <CategoryAdmin />;
      default:
        return <QuizAdmin />;
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar Navigation */}

      <aside className="w-64 bg-base-200 p-6">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
        >
          Home
        </NavLink>
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav>
          <ul className="menu menu-compact">
            <li
              className={
                activeSection === "quiz" ? "bg-primary text-white rounded" : ""
              }
            >
              <button
                onClick={() => setActiveSection("quiz")}
                className="w-full text-left"
              >
                Quiz
              </button>
            </li>
            <li
              className={
                activeSection === "course"
                  ? "bg-primary text-white rounded"
                  : ""
              }
            >
              <button
                onClick={() => setActiveSection("course")}
                className="w-full text-left"
              >
                Course
              </button>
            </li>
            <li
              className={
                activeSection === "student"
                  ? "bg-primary text-white rounded"
                  : ""
              }
            >
              <button
                onClick={() => setActiveSection("student")}
                className="w-full text-left"
              >
                Student
              </button>
            </li>
            <li
              className={
                activeSection === "category"
                  ? "bg-primary text-white rounded"
                  : ""
              }
            >
              <button
                onClick={() => setActiveSection("category")}
                className="w-full text-left"
              >
                Category
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-6 bg-base-100">{renderContent()}</main>
    </div>
  );
}
