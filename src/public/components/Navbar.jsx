import React from "react";
import NavItems from "./navbar/NavItems";
import DarKModeSwitch from "./navbar/DarkModeSwitch";
import { useState, useEffect } from "react";
import Modal from "./form/Modal";
import { useAuth } from "../auth_context/AuthProvider";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { isAuthorised } = useAuth();
  const [onScroll, setOnScroll] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setOnScroll(true);
      } else {
        setOnScroll(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div>
      <div
        className={`navbar bg-base-100 navbar-center md:px-10 px-1 fixed top-0 left-0 right-0 z-40 bg-transparent transition duration-300 ${
          onScroll
            ? "dark:backdrop-brightness-50 dark:backdrop-contrast-100 backdrop-contrast-50 backdrop-brightness-100"
            : ""
        } shadow-lg `}
      >
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <NavItems />
            </ul>
          </div>
            <Link to="/" className="btn btn-ghost text-xl text-bold cursor-pointer">
              Dunamis
            </Link>
        </div>
        <div className="navbar-center hidden lg:flex mx-1 navbar-end">
          <ul className="menu menu-horizontal">
            <NavItems />
          </ul>
        </div>
        {isAuthorised ? (
          <div className="ml-24 md:ml-1 transition duration-300">
            <Link to={"/user/logout/"}>
              <button className="dark:bg-base-200 bg-gray-300 dark:text-white text-gray-800 px-2 py-1 md:px-4 md:py-2 rounded-lg dark:hover:bg-amber-400 hover:bg-slate-400">
                Logout
              </button>
            </Link>
          </div>
        ) : (
          <div>
            <div className="ml-24 md:ml-1 transition duration-300">
              <p
                onClick={() =>
                  document.getElementById("login_modal").showModal()
                }
                className="dark:bg-base-200 bg-gray-300 dark:text-white text-gray-800 px-2 py-1 md:px-4 md:py-2 rounded-lg dark:hover:bg-amber-400 hover:bg-slate-400"
              >
                Login
              </p>
              <Modal id="login_modal" />
            </div>
            <div className="ml-24 md:ml-1 transition duration-300">
              <p
                onClick={() =>
                  document.getElementById("register_modal").showModal()
                }
                className="dark:bg-base-200 bg-gray-300 dark:text-white text-gray-800 px-2 py-1 md:px-4 md:py-2 rounded-lg dark:hover:bg-amber-400 hover:bg-slate-400"
              >
                Register
              </p>
              <Modal id="register_modal" />
            </div>
          </div>
        )}
        <div className="mx-1 mb-1">
          <DarKModeSwitch />
        </div>
      </div>
      <div className="p-8"></div>
    </div>
  );
}
