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
            className={({ isActive }) =>
              isActive ? activeClass : inactiveClass
            }
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
            className={({ isActive }) =>
              isActive ? activeClass : inactiveClass
            }
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
            className={({ isActive }) =>
              isActive ? activeClass : inactiveClass
            }
          >
            Admin
          </NavLink>
        </li>
      )}
      {isAuthorised && authUser?.student?.role === "student" && (
        <li>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? activeClass : inactiveClass
            }
          >
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5.121 17.804A9 9 0 1112 21a9 9 0 01-6.879-3.196zM12 7a4 4 0 110 8 4 4 0 010-8z"
                />
              </svg>
              Profile
            </div>
          </NavLink>
        </li>
      )}
    </>
  );
}
