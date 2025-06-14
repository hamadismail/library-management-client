import React from "react";
import { Link, NavLink, useNavigate } from "react-router";
import "./header.css";
import { Tooltip } from "react-tooltip";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const Header = () => {
  const { user, setUser, signOutUser } = useAuth();
  const navigate = useNavigate();
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      {user && (
        <>
          <li onClick={window.scrollTo(0, 0)}>
            <NavLink to="/all-books">All Books</NavLink>
          </li>
          <li>
            <NavLink to="/add-book">Add Book</NavLink>
          </li>
          <li>
            <NavLink to={"/borrowed-books"}>Borrowed Books</NavLink>
          </li>
        </>
      )}
    </>
  );
  const handleSignOut = () => {
    signOutUser()
      .then((result) => {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "SignOut Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        setUser(null);
        navigate("/");
      })
      .catch((error) => {
        alert(error.code);
      });
  };
  return (
    <div className="bg-base-100 shadow-sm fixed w-full z-10 top-0">
      <Tooltip id="my-tooltip" />
      <div className="navbar max-w-7xl mx-auto p-2">
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
        {user ? (
          <div className="navbar-end gap-2">
            <img
              className="cursor-pointer h-8 w-8 border-2 rounded-full object-cover"
              src={user.photoURL}
              alt="User Image"
              data-tooltip-id="my-tooltip"
              data-tooltip-content={user.displayName}
              data-tooltip-place="top"
            />
            <button
              onClick={handleSignOut}
              className="btn font-normal font-barlow-medium bg-gray-900 hover:bg-gray-950 text-white rounded-md"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="navbar-end gap-2">
            <Link
              to="/signin"
              className="btn font-barlow-medium font-normal bg-gray-900 hover:bg-gray-950 text-white rounded-md"
            >
              Login
            </Link>
            <Link
              to="register"
              className="btn font-barlow-medium font-normal bg-white text-gray-900 hover:bg-gray-900 hover:text-white rounded-md"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
