import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../auth_context/AuthProvider";

export default function NavItems() {
  const { isAuthorised } = useAuth();

  // Define active and inactive class names using daisyUI and Tailwind
  const activeClass = "bg-primary text-white rounded-lg px-4 py-2";
  const inactiveClass =
    "text-base-content hover:bg-base-200 rounded-lg px-4 py-2 transition-colors duration-300";

  return (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? activeClass : inactiveClass
          }
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
          className={({ isActive }) =>
            isActive ? activeClass : inactiveClass
          }
        >
          Contact
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? activeClass : inactiveClass
          }
        >
          About
        </NavLink>
      </li>
    </>
  );
}
