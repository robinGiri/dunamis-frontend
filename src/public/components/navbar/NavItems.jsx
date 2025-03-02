import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../auth_context/AuthProvider";

export default function NavItems() {
  const { isAuthorised, authUser } = useAuth();

  // Define active and inactive class names using daisyUI/Tailwind classes
  const activeClass = "bg-primary text-white rounded-lg px-4 py-2";
  const inactiveClass =
    "text-base-content hover:bg-base-200 rounded-lg px-4 py-2 transition-colors duration-300";

  return (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
        >
          Home
        </NavLink>
      </li>
      {isAuthorised ? (
        <li>
          <NavLink
            to="/books"
            className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
          >
            Books
          </NavLink>
        </li>
      ) : (
        <li>
          <p
            onClick={() => document.getElementById("login_modal").showModal()}
            className="cursor-pointer text-base-content hover:bg-base-200 rounded-lg px-4 py-2 transition-colors duration-300"
          >
            Books
          </p>
        </li>
      )}
      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
        >
          Contact
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
        >
          About
        </NavLink>
      </li>
      {/* Only show Quiz tab if the user is a student */}
      {isAuthorised && authUser?.student?.role === "student" && (
        <li>
          <NavLink
            to="/quiz/take"
            className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
          >
            Quiz
          </NavLink>
        </li>
      )}
      {/* Optionally, add an Admin link if needed */}
      {isAuthorised && authUser?.student?.role === "admin" && (
        <li>
          <NavLink
            to="/admin"
            className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
          >
            Admin
          </NavLink>
        </li>
      )}
    </>
  );
}
