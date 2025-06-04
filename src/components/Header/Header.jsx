import React from "react";
import { Link, NavLink } from "react-router";
import "./header.css";

const Header = () => {
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/all-books">All Books</NavLink>
      </li>
      <li>
        <NavLink to="/add-book">Add Book</NavLink>
      </li>
      <li>
        <NavLink to="/borrowed-books">Borrowed Books</NavLink>
      </li>
    </>
  );
  return (
    <div className="bg-base-100 shadow-sm fixed w-full z-10 top-0">
      <div className="navbar w-11/12 mx-auto p-0">
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
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Link to="/" className="cursor-pointer text-xl font-barlow-semibold">
            <img className="w-12" src="/logo.png" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end gap-2">
          <Link className="btn">Login</Link>
          <Link className="btn">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
